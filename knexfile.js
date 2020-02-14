module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/similiar_vehicles',
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: './db/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: 'postgres://localhost/similiar_vehicles',
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      //directory: __dirname + '/db/seeds',
    }
  }
}
