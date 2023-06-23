const sendResponse = ({res, code = 200, success = true, message, data, errors}) => {
  const result = {
    app: `App Name API by freely.digital`,
    success
  };

  if (message) {
    result.message = message;
  }

  if (data) {
    result.data = data;
  }

  if (errors) {
    result.errors = errors;
  }

  res.status(code).send(result);
};

module.exports = {
  sendResponse
};