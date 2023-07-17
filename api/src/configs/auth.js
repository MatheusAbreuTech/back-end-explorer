module.exports = {
  jwt: {
    secret: process.env.AUTH_SECRET_KEY,
    expiresIn: '1d',
  },
};
