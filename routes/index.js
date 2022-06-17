import express from 'express'

import { homeRoute } from './modules/home.js'
import { restaurantRoute } from './modules/restaurants.js'
import { usersRoute } from './modules/users.js'
const router = express.Router()

router.use('/', homeRoute)
router.use('/restaurants', restaurantRoute)
router.use('/users', usersRoute)

export { router as indexRoute }
