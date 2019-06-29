let conf = {
    user: 'sa',
    password: '123456',
    server: 'localhost',
    database: 'bizplus',
    port: 1433,
    pool: {
      min: 0,
      max: 10,
      idleTimeoutMillis: 3000
    }
};

module.exports = conf;