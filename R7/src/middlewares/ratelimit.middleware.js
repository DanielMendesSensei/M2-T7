import rateLimit from "express-rate-limit";

const config = {
  enable: process.env.RATE_LIMIT_ENABLED,
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS),
  maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS),
  message: process.env.RATE_LIMIT_MESSAGE,
  skipSuccessful: process.env.RATE_LIMIT_SKIP_SUCCESSFUL,
};

export const globalLimiter = rateLimit({
  windowMs: config.windowMs,
  max: config.maxRequests,
  message: {
    success: false,
    message: config.message,
    retryAfter: Math.ceil(config.windowMs / 1000),
    standardHeader: true,
    legacyHeader: false,
    skip: () => !config.enable,
    skipSuccessful: config.skipSuccessful,
  },
});

export const rateLimitConfig = config;
