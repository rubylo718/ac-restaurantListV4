import express from 'express'
const router = express.Router()
import Restaurants from '../../models/restaurants.js'

router.get('/', (req, res) => {
  Restaurants.find()
    .lean()
    .sort({_id: 'asc'})
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// sorting by selected method
router.get('/sort', (req, res) => {
  let sortMethod = req.query.sortMethods
  switch (sortMethod) { 
    case "1": sortMethod = {name: 'asc'}; break;
    case "2": sortMethod = {name: 'desc'}; break;
    case "3": sortMethod = {category:'asc'}; break;
    case "4": sortMethod = {location: 'asc'}; break;
  }  
  Restaurants.find()
    .lean()
    .sort(sortMethod)
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// search restaurants by name or category
router.get('/search', (req, res)=> {
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