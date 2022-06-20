import express from 'express'
import User from '../../models/users.js'
import passport from 'passport'
import bcrypt from 'bcryptjs'
const router = express.Router()
const saltRounds = 10

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  }))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmpassword } = req.body
  const errors = []
  const errorItem = []
  const emailExist = await User.findOne({ email })
  if (emailExist) {
    errors.push({ message: 'This email has been registered.' })
  }
  if (!email || !password || !confirmpassword) {
    errors.push({ message: 'Please fill in the required infomation.' })
    if (!email) { errorItem.push('errorEmail') }
    if (!password) { errorItem.push('errorPwd') }
    if (!confirmpassword) { errorItem.push('errorConPwd') }
  }
  if (password !== confirmpassword) {
    errors.push({ message: 'The confirm password is not match with the password. Please check.' })
  }
  if (errors.length) {
    return res.render('register', { errorItem, errors, name, email, password, confirmpassword })
  }

  const hash = await bcrypt.hash(password, saltRounds)
  const newUser = new User({ name, email, password: hash })
  try {
    await newUser.save()
    req.flash('success_msg', 'Register successfully.')
    res.redirect('/auth/login')
  } catch (err) {
    req.flash('warning_msg', 'Something went wrong.')
    res.redirect('auth/register')
  }
})

router.get('/logout', (req, res) => {
  req.logOut()
  req.flash('success_msg', 'Logout successfully.')
  res.redirect('/users/login')
})

export { router as usersRoute }
