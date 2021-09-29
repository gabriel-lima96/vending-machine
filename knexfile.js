const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'data', 'database.sqlite'),
    },
    migrations: {
      directory: path.resolve(__dirname, 'data', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'data', 'seeds'),
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'data', 'database.sqlite'),
    },
    migrations: {
      directory: path.resolve(__dirname, 'data', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'data', 'seeds'),
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'sqlite3',
    connection: ':memory:',
    migrations: {
      directory: path.resolve(__dirname, 'data', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'data', 'seeds'),
    },
    useNullAsDefault: true,
  },
};