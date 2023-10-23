/**
 * @param {Object} res
 * @param {number} httpStatusCode
 * @param {string} message
 * @param {Object} data
 * @returns standardized http response
 */
function createHttpResponse(res, httpStatusCode, message, data) {
  return res.status(httpStatusCode).json({
    code: httpStatusCode,
    message: message,
    data: data,
  });
}

module.exports = {
  createHttpResponse: createHttpResponse,
};
