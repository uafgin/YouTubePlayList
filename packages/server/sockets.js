let io;

module.exports = {
  init: (serverInstance) => {
    io = require("socket.io")(serverInstance, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
  },
  getInstance: () => {
    if (!io) {
      throw new Error("io did not initiate!");
    }
    return io;
  },
};
