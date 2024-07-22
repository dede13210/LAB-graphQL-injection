const mongoose = require('mongoose');
const Message = require('../models/message');
const User = require('../models/user');

mongoose.connect('mongodb://localhost:27017/chat-app', {
});

mongoose.connection.once('open', async () => {
  console.log('Connected to MongoDB');

  const user1 = await User.findOne({ email: 'micheline@mail.com'});
  if (!user1) {
    console.error('No user found. Please create a user first.');
    process.exit(1);
  }

  const user2 = await User.findOne({ email: 'robert@mail.com' });
  if (!user2) {
    console.error('No user found with email');
    process.exit(1);
  }

  const message1 = [
    { content: 'Salut', userId: user1._id },
  ];
  const message2 = [
    { content: 'Hey comment tu vas?', userId: user2._id },
  ];
  const message3 = [
    { content: 'Je vais bien merci et toi?', userId: user1._id },
  ];
  const message4 = [
    {content: 'Ça va', userId: user2._id },
  ];
  const message5 = [
    {content: 'Je cherche à me faire des amis on échange nos numéro ?', userId: user1._id },
  ];
  const message6 = [
    {content: 'Désolé je suis pas intéressé', userId: user2._id },
  ];
  const message7 = [
    {content: 'Comment ça !!!! Tu vas voir tu vas le rergretter :(', userId: user1._id },
  ];


  await Message.insertMany(message1);
  await new Promise(resolve => setTimeout(resolve, 1000));
  await Message.insertMany(message2);
  await new Promise(resolve => setTimeout(resolve, 1000));
  await Message.insertMany(message3);
  await new Promise(resolve => setTimeout(resolve, 1000));
  await Message.insertMany(message4);
  await new Promise(resolve => setTimeout(resolve, 1000));
  await Message.insertMany(message5);
  await new Promise(resolve => setTimeout(resolve, 1000));
  await Message.insertMany(message6);
  await new Promise(resolve => setTimeout(resolve, 1000));
  await Message.insertMany(message7);

  console.log('Test messages inserted');
  process.exit(0);
});
