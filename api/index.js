const app = require('../app');

// Vercel will use the exported app as the handler when using Serverless Functions.
// Export both CommonJS and default to be robust across different bundlers.
module.exports = app;
module.exports.default = app;