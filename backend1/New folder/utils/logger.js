// Logging utility with info, error, and warn methods
const logger = {
  info: (...args) => {
    if (process.env.NODE_ENV !== 'test') {
      console.log('[INFO]', ...args);
    }
  },
  error: (...args) => {
    if (process.env.NODE_ENV !== 'test') {
      console.error('[ERROR]', ...args);
    }
  },
  warn: (...args) => {
    if (process.env.NODE_ENV !== 'test') {
      console.warn('[WARN]', ...args);
    }
  }
};

module.exports = logger;
