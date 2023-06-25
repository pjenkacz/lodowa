const User = require("../../models/User")

const users = await User.query();

  
  const sessions = {};
  
  function getSession(sessionId) {
    const session = sessions[sessionId];
  
    return session && session.valid ? session : null;
  }
  
  function invalidateSession(sessionId) {
    const session = sessions[sessionId];
  
    if (session) {
      sessions[sessionId].valid = false;
    }
  
    return sessions[sessionId];
  }
  
  function createSession(email, name) {
    const sessionId = String(Object.keys(sessions).length + 1);
  
    const session = { sessionId, email, valid: true, name };
  
    sessions[sessionId] = session;
  
    return session;
  }
  
  function getUser(email) {
    return users.find((user) => user.email === email);
  }
  
  module.exports = {
    sessions,
    getSession,
    invalidateSession,
    createSession,
    getUser,
  };
  