const defaultConfig = {
  port: 3000,
  nodeEnv: 'development',
  dbUrl: 'file:./dev.db',
  logLevel: 'info',
  corsAllowedOrigins: ['*'],
}

const parseCorsOrigins = (originsStr?: string): string[] => {
  if (!originsStr) return []
  return originsStr.split(',').map((origin) => origin.trim())
}

export const config = {
  ...defaultConfig,
  port: parseInt(process.env.PORT || defaultConfig.port.toString(), 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUrl: process.env.DATABASE_URL || defaultConfig.dbUrl,
  logLevel: process.env.LOG_LEVEL || defaultConfig.logLevel,
  corsAllowedOrigins: process.env.CORS_ALLOWED_ORIGINS
    ? parseCorsOrigins(process.env.CORS_ALLOWED_ORIGINS)
    : defaultConfig.corsAllowedOrigins,
}

export default config
