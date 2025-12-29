/**
 * Logger utility for conditional logging based on environment
 *
 * In development mode (import.meta.env.DEV):
 *   - All log levels are active with detailed messages (debug, info, warn, error)
 *   - Full context and error details are logged
 *
 * In production mode (!import.meta.env.DEV):
 *   - warn and error log only generic messages (no sensitive details)
 *   - debug and info are no-ops
 *   - Prevents information disclosure in production console
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
        console.log(prefix, message, ...args);
      }
    },

    /**
     * Warning level - Conditional output based on environment
     * Development: Full message with details
     * Production: Generic warning message only (no sensitive details)
     * @param {string} message - The message to log
     * @param {...any} args - Additional arguments to log
     */
    warn: (message, ...args) => {
      if (isDev) {
        // Development: log full details
        console.warn(prefix, message, ...args);
      } else {
        // Production: log only generic message without details
        console.warn(prefix, "Une erreur non-critique s'est produite");
      }
    },

    /**
     * Error level - Conditional output based on environment
     * Development: Full error message with stack trace
     * Production: Generic error code only (no sensitive details)
     * @param {string} message - The message to log
     * @param {...any} args - Additional arguments to log
     */
    error: (message, ...args) => {
      if (isDev) {
        // Development: log full error details
        console.error(prefix, message, ...args);
      } else {
        // Production: log only generic error code
        // Generate a simple error code based on context for tracking
        const errorCode = `ERR_${context.toUpperCase()}_${Date.now() % 10000}`;
        console.error(prefix, `Une erreur s'est produite (Code: ${errorCode})`);
      }
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
