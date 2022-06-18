import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import exphbs from 'express-handlebars'
import methodOverride from 'method-override'
import helpers from 'handlebars-helpers'
import { indexRoute } from './routes/index.js'
import * as mongoose from './config/mongoose.js'
import usePassport from './config/passport.js'

const app = express()
const port = process.env.PORT
const multihelpers = helpers()

app.engine('hbs', exphbs.engine({ helpers: multihelpers, defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: true
}))

usePassport(app)

app.use(indexRoute)

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
