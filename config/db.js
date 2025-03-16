const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

const connectDB = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Connected to SQL Server Database');
        return pool;
    } catch (err) {
        console.error('Database connection failed: ', err);
        throw err;
    }
};

module.exports = { sql, connectDB };