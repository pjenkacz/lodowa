const {
    createSessionHandler,
    getSessionHandler,
    deleteSessionHandler,
  } = require("./controllers/session.controller");
  const { requireUser } = require("./middleware/requireUser");
  
  function routes(app) {
    // login
    app.post("/api/session", createSessionHandler);
    // get the current session
  
    app.get("/api/session", requireUser, getSessionHandler);
    // logout
    app.delete("/api/session", requireUser, deleteSessionHandler);
  }
  
  module.exports = routes;
  