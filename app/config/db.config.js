// Use Postgres (Neon) in production, SQLite for local development
const isProduction = process.env.DATABASE_URL;

module.exports = isProduction
    ? {
        dialect: "postgres",
        url: process.env.DATABASE_URL,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
    : {
        dialect: "sqlite",
        storage: "./database.sqlite",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    };

