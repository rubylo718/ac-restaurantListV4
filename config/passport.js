import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import User from '../models/users.js'
import bcrypt from 'bcryptjs'
const saltRounds = 10

export default app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const foundUser = await User.findOne({ email })
    if (!foundUser) {
      return done(null, false, { message: 'Email account not existed.' })
    } else {
      const isMatch = await bcrypt.compare(password, foundUser.password)
      try {
        if (!isMatch) {
          return done(null, false, { message: 'Password incorrect' })
        } else {
          return done(null, foundUser)
        }
      } catch (err) {
        return done(err, false)
      }
    }
  }))

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },
  async (accessToken, refreshToken, profile, done) => {
    const { name, email, id } = profile._json
    const foundUser = await User.findOne({ email })
    if (foundUser) {
      return done(null, foundUser)
    } else {
      const randomPassword = Math.random().toString(36).slice(-8)
      const hash = await bcrypt.hash(randomPassword, saltRounds)
      const newUser = new User({ name, email, password: hash, fbID: id })
      try {
        await newUser.save()
        return done(null, newUser)
      } catch (error) {
        return done(error, newUser)
      }
    }
  }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => done(error, null))
  })
}
