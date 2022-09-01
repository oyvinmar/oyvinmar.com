/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  // appDirectory: 'app',
  serverBuildTarget:
    process.env.NODE_ENV === 'development' ? undefined : 'vercel',
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === 'development' ? undefined : './server.js',
  cacheDirectory: './node_modules/.cache/remix',
  ignoredRouteFiles: ['**/.*'],
  // ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
};
