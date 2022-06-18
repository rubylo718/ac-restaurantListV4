import express from 'express'
import Restaurants from '../../models/restaurants.js'
const router = express.Router()

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurants.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// sorting by selected method
router.get('/sort', (req, res) => {
  const sortMethod = req.query.sortMethods
  let method = ''
  switch (sortMethod) {
    case '1': method = { name: 'asc' }; break
    case '2': method = { name: 'desc' }; break
    case '3': method = { category: 'asc' }; break
    case '4': method = { location: 'asc' }; break
  }
  Restaurants.find()
    .lean()
    .sort(method)
    .then(restaurants => res.render('index', { restaurants, sortMethod }))
    .catch(error => console.log(error))
})

// search restaurants by name or category
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  return Restaurants.find()
    .lean()
    .then(restaurants => {
      const filteredData = restaurants.filter(
        data => data.name.toLowerCase().includes(keyword) ||
      data.category.includes(keyword)
      )
      res.render('index', { restaurants: filteredData, keyword: keyword })
    })
    .catch(error => console.log(error))
})

export { router as homeRoute }
