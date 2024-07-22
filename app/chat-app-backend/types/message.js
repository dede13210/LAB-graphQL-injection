const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const UserType = require('./user');
const User = require('../models/user');

const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      }
    },
    createdAt: { type: GraphQLString }
  })
});

module.exports = MessageType;
