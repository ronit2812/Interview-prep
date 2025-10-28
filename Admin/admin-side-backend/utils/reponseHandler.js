const APIResponse = (res, status, message, data = null) => {
  return res.status(status).json({
    success: status >= 200 && status <= 299,
    message,
    data,
  });
};

module.exports = APIResponse;
