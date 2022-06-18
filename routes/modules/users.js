import express from 'express'
import User from '../../models/users.js'
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  const { name, email, password, confirmpassword } = req.body
  const emailExist = await User.findOne({ email })
  if (emailExist) {
    console.log('this email is existed')
    res.redirect('register')
  }
  
  const newUser = new User({ name, email, password })
  newUser.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

export { router as usersRoute }
