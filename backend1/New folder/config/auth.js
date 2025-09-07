// JWT and authentication config
module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  jwtExpire: '7d',
};
