import { Meteor } from 'meteor/meteor';

Meteor.publish('messages', function messagesPuublication() {
  return Messages.find();
});

Meteor.methods({
  'messages.insert'(text) {
    if(!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
      }
      Messages.insert({
        text,
        createdAt: new Date(),
        owner: Meteor.userId(),
        username: Meteor.user().username
      });
  },
  'messages.remove'(id) {
    const message = Messages.findOne(id);
    if(message.owner == Meteor.userId()){
    Messages.remove(id);
    }
  }
});
