import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/users.js'
import bcrypt from 'bcryptjs'

export default app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    let foundUser = await User.findOne({ email })  
    if (!foundUser) {
      return done(null, false, { message: 'Email or Password incorrect' })
    } else { 
      const isMatch = await bcrypt.compare(password, foundUser.password)
      try {
        if (!isMatch) {
          return done(null, false, { message: 'Email or Password incorrect' })
        } else {
          return done (null, foundUser)
        }
      } catch(err) {
        return done(err, false)
      }   
    } 
  }))

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })

  passport.deserializeUser((_id, done) => {
    User.findById(_id)
      .lean()
      .then(user => done(null, user))
      .catch(error => done(error, null))
  })
}
