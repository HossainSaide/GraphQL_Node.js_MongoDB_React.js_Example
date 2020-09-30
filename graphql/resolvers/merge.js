const Event = require("../../models/event");
const User = require("../../models/user");

const { dateToString } = require("../../helpers/index");

const transFormEvent = (event) => {
    return {
      ...event._doc,
      _id: event.id,
      date: dateToString(event._doc.date),
      creator: user.bind(this, event.creator),
    };
  };

  
const transFormBooking = (booking) => {
    return {
      ...booking._doc,
      _id: booking.id,
      user: user.bind(this, booking._doc.user),
      event: singleEvent.bind(this, booking._doc.event),
      createdAt: dateToString(booking._doc.createdAt),
      updatedAt: dateToString(booking._doc.updatedAt),
    };
};

const user = (UserId) => {
  return User.findById(UserId)
    .then((user) => {
      return {
        ...user._doc,
        _id: user.id,
        createdEvents: events.bind(this, user._doc.createdEvents),
      };
    })
    .catch((err) => {
      throw err;
    });
};

const events = (eventIds) => {
  return Event.findBy({ _id: { $in: eventIds } })
    .then((events) => {
      return events.map((event) => {
        return transFormEvent(event);
      });
    })
    .catch((err) => {
      throw err;
    });
};

const singleEvent = (eventId) => {
  return Event.findById(eventId)
    .then((event) => {
      return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator),
      };
    })
    .catch((err) => {
      throw err;
    });
};

exports.transFormEvent = transFormEvent;
exports.transFormBooking = transFormBooking;