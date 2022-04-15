import express from 'express'

import { homeRoute } from './modules/home.js'
import { restaurantRoute } from './modules/restaurants.js'
const router = express.Router()
router.use('/', homeRoute)
router.use('/restaurants', restaurantRoute)

export { router as indexRoute }
