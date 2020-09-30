const Event = require("../../models/event");
const User = require("../../models/user");

const { transFormEvent } = require("./merge");

module.exports = {
  events: () => {
    return Event.find()
      .then((events) => {
        return events.map((event) => {
          return transFormEvent(event);
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  createEvent: (args, req) => {
    if(!req.isAuth){
      throw new Error('Unauthenticated')
    }
    const event = new Event({
      title: args.inputEvent.title,
      description: args.inputEvent.description,
      price: +args.inputEvent.price,
      date: args.inputEvent.date,
      creator: req.userId,
    });
    let createdEvent;
    return event
      .save()
      .then((result) => {
        createdEvent = transFormEvent(result);
        return User.findById(req.userId);
      })
      .then((user) => {
        if (!user) {
          throw new Error("User not found!");
        } else {
          user.createdEvents.push(event);
          return user.save();
        }
      })
      .then((result) => {
        return createdEvent;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
};
