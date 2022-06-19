import 'dotenv/config'
import bcrypt from 'bcryptjs'
import Restaurants from '../restaurants.js'
import User from '../users.js'
import db from '../../config/mongoose.js'

import { createRequire } from 'module'
const require = createRequire(import.meta.url) // construct the require method
const restaurantList = require('../../restaurant.json').results // use the require method

const SEED_USERS = [
  { email: 'user1@example.com', password: '12345678', ownedRestarantId: [1, 2, 3] },
  { email: 'user2@example.com', password: '12345678', ownedRestarantId: [4, 5, 6] }
]

db.once('open', () => {
  console.log('mongodb connected! run the seeder')
  Promise.all(
    SEED_USERS.map(async function (seedUser) {
      const hash = await bcrypt.hash(seedUser.password, 10)
      const newUser = new User({ email: seedUser.email, password: hash })
      try {
        await newUser.save()
        const userId = newUser._id
        return Promise
          .all(restaurantList.map(restaurant => {
            if (seedUser.ownedRestarantId.includes(restaurant.id)) {
              restaurant.userId = userId
              return Restaurants.create(restaurant)
            }
          }))
      } catch (err) {
        console.log('sth went wrong', err)
      }
    })
  )
    .then(() => {
      console.log('seeder done')
      process.exit()
    })
})
