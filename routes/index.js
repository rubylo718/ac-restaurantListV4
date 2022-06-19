import express from 'express'
import { authRoute } from './modules/auth.js'
import { homeRoute } from './modules/home.js'
import { restaurantRoute } from './modules/restaurants.js'
import { usersRoute } from './modules/users.js'
import authCheck from '../middleware/authCheck.js'
const router = express.Router()

router.use('/auth', authRoute)
router.use('/users', usersRoute)
router.use('/restaurants', authCheck, restaurantRoute)
router.use('/', authCheck, homeRoute)

export { router as indexRoute }
