/**
 * Logger utility for conditional logging based on environment
 *
 * In development mode (import.meta.env.DEV):
 *   - All log levels are active (debug, info, warn, error)
 *
 * In production mode (!import.meta.env.DEV):
 *   - Only warn and error are active
 *   - debug and info are no-ops
 *
 * @param {string} context - The context/module name for the logger
 * @returns {Object} Logger instance with debug, info, warn, error methods
 *
 * @example
 * import { createLogger } from './utils/logger';
 * const logger = createLogger('MyComponent');
 * logger.debug('Debug message', data);
 * logger.warn('Warning message', error);
 */
export const createLogger = (context) => {
  const isDev = import.meta.env.DEV;
  const prefix = `[${context}]`;

  return {
    /**
     * Debug level - Only in development
     * @param {string} message - The message to log
     * @param {...any} args - Additional arguments to log
     */
    debug: (message, ...args) => {
      if (isDev) {
        console.log(prefix, message, ...args);
      }
    },

    /**
     * Info level - Only in development
     * @param {string} message - The message to log
     * @param {...any} args - Additional arguments to log
     */
    info: (message, ...args) => {
      if (isDev) {
        console.info(prefix, message, ...args);
      }
    },

    /**
     * Warning level - In development and production
     * @param {string} message - The message to log
     * @param {...any} args - Additional arguments to log
     */
    warn: (message, ...args) => {
      console.warn(prefix, message, ...args);
    },

    /**
     * Error level - In development and production
     * @param {string} message - The message to log
     * @param {...any} args - Additional arguments to log
     */
    error: (message, ...args) => {
      console.error(prefix, message, ...args);
    },

    /**
     * Group logging - Only in development
     * @param {string} label - The group label
     */
    group: (label) => {
      if (isDev) {
        console.group(prefix, label);
      }
    },

    /**
     * Group end - Only in development
     */
    groupEnd: () => {
      if (isDev) {
        console.groupEnd();
      }
    },

    /**
     * Table logging - Only in development
     * @param {any} data - The data to display as a table
     */
    table: (data) => {
      if (isDev) {
        console.table(data);
      }
    },
  };
};
