const dev = process.env.NODE_ENV !== "production";

module.exports = {
  env: {
    baseUrl: dev
      ? 'http://localhost:3000/api/v1'
      : 'https://omniscode.one/api/v1',
  },
};
