const inArray = require('../lib/inArray');
const responses = require('./responses');
const parameters = require('./parameters');

/**
 * Allowed methods
 * @type {string[]}
 */
const ALLOWED_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options'];

module.exports = (path, data) => {
  const res = [];
  let pathParameters = null;

  if (path && data) {
    // Make path as a header
    res.push(`### ${path}`);
    res.push('---');

    // Check if parameter for path are in the place
    if ('parameters' in data) {
      pathParameters = data.parameters;
    }

    // Go further method by methods
    Object.keys(data).map(method => {
      if (inArray(method, ALLOWED_METHODS)) {
        // Set method as a subheader
        res.push(`##### ***${method.toUpperCase()}***`);
        const pathInfo = data[method];

        // Set summary
        if ('summary' in pathInfo) {
          res.push(`**Summary:** ${pathInfo.summary}\n`);
        }

        // Set description
        if ('description' in pathInfo) {
          res.push(`**Description:** ${pathInfo.description}\n`);
        }

        // Build parameters
        if ('parameters' in pathInfo || pathParameters) {
          res.push(`${parameters(pathInfo.parameters, pathParameters)}\n`);
        }

        // Build responses
        if ('responses' in pathInfo) {
          res.push(`${responses(pathInfo.responses)}\n`);
        }
      }
    });
  }
  return res.length ? res.join('\n') : null;
};
