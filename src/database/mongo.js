import mongoose from 'mongoose'

// IMPORT CONFIG
import { MONGO_URL } from './config.js'

/* Connecting to the database. */
const conn = () => {
  mongoose.connect(MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
}

export default conn
