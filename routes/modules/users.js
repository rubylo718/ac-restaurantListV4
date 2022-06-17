import express from 'express'
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

export { router as usersRoute }
