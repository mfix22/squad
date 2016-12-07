module.exports = {

  ENV: process.env.NODE_ENV || 'dev',
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || '4000',
  DB_NAME: process.env.DB_NAME || 'squad',
  DB_PORT: process.env.DB_PORT || 27017,
  DB_USER: process.env.DB_USER || '',
  DB_PASSWORD: process.env.DB_PASSWORD || '',


  connectDB ()  {
    if (!['dev', 'production'].includes(this.ENV)) {
      // setup test db
    }

    const MongoClient = require('mongodb')
    const url = `mongodb://${this.HOST}:${this.DB_PORT}/${this.DB_NAME}`

    return MongoClient.connect(url)
  }
}
