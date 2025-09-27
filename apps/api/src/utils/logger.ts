import winston from 'winston';

const { combine, timestamp, label, printf } = winston.format;

const format = printf(({ level, message, label, timestamp }) => {
    return `[${timestamp}] [${label}] ${level}: ${message}`;
});

export const system = winston.createLogger({
    level: 'info',
    format: combine(
        label({ label: "System" }),
        timestamp(),
        format
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/system.log' })
    ]
})

export const database = winston.createLogger({
    level: 'info',
    format: combine(
        label({ label: "Database" }),
        timestamp(),
        format
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/database.log' })
    ]
})

export const api = winston.createLogger({
    level: 'info',
    format: combine(
        label({ label: "API" }),
        timestamp(),
        format
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/api.log' })
    ]
})