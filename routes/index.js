import express from 'express'
const router = express.Router()

import { homeRoute } from './modules/home.js'
import { restaurantRoute } from './modules/restaurants.js'
router.use('/', homeRoute)
router.use('/restaurants', restaurantRoute)

export { router as indexRoute }