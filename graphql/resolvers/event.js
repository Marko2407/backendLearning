const Event = require("../../models/event");
const User = require("../../models/user");
const { transformEvent } = require("../resolvers/merge");

module.exports = {
  events: async () => {
    try {
      const result = await Event.find();
      console.log(result);
      return result.map((event) => {
        return transformEvent(event);
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if(!req.isAuth){
        throw new Error('Unauthenticated!')
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId,
    });
    let createdEvents;
    try {
      const result = await event.save();
      createdEvents = transformEvent(result);
      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error("User doesnt exists ");
      }
      user.createdEvents.push(event);
      await user.save();
      return createdEvents;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
