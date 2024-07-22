const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLList } = require('graphql');
const UserType = require('./types/user');
const MessageType = require('./types/message');
const User = require('./models/user');
const Message = require('./models/message');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { email: { type: GraphQLString } , id: { type: GraphQLID } },
      resolve(parent, args) {
        if(!args.id && !args.email) {
          throw new Error('Please provide an id or email');
        }
        if (args.id) {
          return User.findById(args.id);
        }elseif(args.email)
        {
        return User.findOne(email == args.email);
        }
      }
    },
       users: {
      type: new GraphQLList(UserType),
      resolve(parent, args, context) {
        if (!context.isAuth) {
          throw new Error('Not authenticated');
        }
        return User.find();
      }
    },
    messages: {
      type: new GraphQLList(MessageType),
      resolve(parent, args) {
        return Message.find().sort({ createdAt: -1 }).limit(50);
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        phone: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const hashedPassword = await bcrypt.hash(args.password, 12);
        const user = new User({
          email: args.email,
          password: hashedPassword,
          phone: args.phone
        });
        return user.save();
      }
    },
    login: {
      type: new GraphQLObjectType({
        name: 'LoginResponse',
        fields: {
          token: { type: GraphQLString },
          user: { type: UserType }
        }
      }),
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const user = await User.findOne({ email: args.email });
        if (!user) {
          throw new Error('User does not exist');
        }
        const isEqual = await bcrypt.compare(args.password, user.password);
        if (!isEqual) {
          throw new Error('Password is incorrect');
        }
        const token = jwt.sign({ userId: user.id }, 'somesecretkey', {
          expiresIn: '1h'
        });
        return { token, user };
      }
    },
    addMessage: {
      type: MessageType,
      args: {
        content: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(parent, args) {
        const message = new Message({
          content: args.content,
          userId: args.userId
        });
        return message.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
