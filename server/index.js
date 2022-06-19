import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import session from 'express-session'
import passportStrategy from './passport/passportStrategy.js'
import postRoutes from './routes/postRotes.js'
import userRoutes from './routes/userRoutes.js'
import MongoStore from 'connect-mongo'

const app = express()
const PORT = process.env.PORT || 5000
dotenv.config()
app.use(cors())

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.CONNECTION_URL,mongooseConnection: mongoose.connection })
  })
)

app.use(passportStrategy.initialize())
app.use(passportStrategy.session())
app.use('/posts', postRoutes)
app.use('/user', userRoutes)

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message))