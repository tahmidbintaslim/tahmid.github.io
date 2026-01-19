// Structured logging utility for better debugging and monitoring
// This replaces console.log with a more structured approach

enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

function formatLogEntry(entry: LogEntry): string {
  const { timestamp, level, message, context, error } = entry;
  let log = `[${timestamp}] ${level}: ${message}`;

  if (context && Object.keys(context).length > 0) {
    log += ` | Context: ${JSON.stringify(context)}`;
  }

  if (error) {
    log += ` | Error: ${error.name} - ${error.message}`;
    if (error.stack) {
      log += `\n${error.stack}`;
    }
  }

  return log;
}

function shouldLog(level: LogLevel): boolean {
  if (process.env.NODE_ENV === 'production') {
    // Only log WARN and ERROR in production
    return level === LogLevel.WARN || level === LogLevel.ERROR;
  }
  // Log everything in development
  return true;
}

export const logger = {
  debug: (message: string, context?: Record<string, unknown>) => {
    if (shouldLog(LogLevel.DEBUG)) {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: LogLevel.DEBUG,
        message,
        context,
      };
      console.log(formatLogEntry(entry));
    }
  },

  info: (message: string, context?: Record<string, unknown>) => {
    if (shouldLog(LogLevel.INFO)) {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: LogLevel.INFO,
        message,
        context,
      };
      console.log(formatLogEntry(entry));
    }
  },

  warn: (message: string, context?: Record<string, unknown>) => {
    if (shouldLog(LogLevel.WARN)) {
      const entry: LogEntry = {
        timestamp: new Date().toISOString(),
        level: LogLevel.WARN,
        message,
        context,
      };
      console.warn(formatLogEntry(entry));
    }
  },

  error: (
    message: string,
    error?: Error | unknown,
    context?: Record<string, unknown>
  ) => {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.ERROR,
      message,
      context,
    };

    if (error instanceof Error) {
      entry.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    } else if (error) {
      entry.error = {
        name: 'Unknown',
        message: String(error),
      };
    }

    console.error(formatLogEntry(entry));
  },
};

export type { LogEntry, LogLevel };
