import winston from 'winston';

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.label(),
        winston.format.timestamp(),
        winston.format.printf(transformableInfo => JSON.stringify({
            timestamp: transformableInfo.timestamp,
            route: transformableInfo.route,
            ...transformableInfo
        }))
    )
});

if (process.env.NODE_ENV === 'development') {
    logger.add(new winston.transports.Console({
        level: 'error',
    }));
} else {
    logger.add(new winston.transports.File({ filename: 'logs/error.log', level: 'error' }));
    if (process.env.NODE_ENV === 'qa') {
        logger.add(new winston.transports.File({ filename: 'logs/combined.log', level: 'info' }));
    }
}

export default logger;