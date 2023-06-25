const { getSession } = require("../db");
const { signJWT, verifyJWT } = require("../utils/jwt.utils");

function deserializeUser(req, res, next) {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return next();
  }

  const { payload, expired } = verifyJWT(accessToken);

  // For a valid access token
  if (payload) {
    req.user = payload;
    return next();
  }

  // expired but valid access token

  const { payload: refresh } =
    expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };

  if (!refresh) {
    return next();
  }

  const session = getSession(refresh.sessionId);

  if (!session) {
    return next();
  }

  const newAccessToken = signJWT(session, "5s");

  res.cookie("accessToken", newAccessToken, {
    maxAge: 300000, // 5 minutes
    httpOnly: true,
  });

  req.user = verifyJWT(newAccessToken).payload;

  return next();
}

module.exports = deserializeUser;
