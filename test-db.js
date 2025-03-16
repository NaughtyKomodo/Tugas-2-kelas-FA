const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'sa',
    server: 'FAFA\\SQLEXPRESS01',
    port: 1433,
    database: 'rest_api_userdb',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function testConnection() {
    try {
        await sql.connect(config);
        console.log('Connection successful!');
    } catch (err) {
        console.error('Connection failed:', err);
    }
}

testConnection();