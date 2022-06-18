import express from 'express'
import Restaurants from '../../models/restaurants.js'
const router = express.Router()

// go to add-new page
router.get('/new', (req, res) => {
  return res.render('new')
})
// add new restaurant: POST '/restaurants and redirect to '/'
router.post('/', (req, res) => {
  const userId = req.user._id 
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body 
  const newRestaurant = new Restaurants({
    name, name_en, category, image, location, phone, google_map, rating, description, userId
  })
  newRestaurant.save()
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// view detail of a certain restaurant
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurants.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// go to edit page
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurants.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
// update detail info after edit
router.put('/:id', (req, res) => {
  const _id = req.params.id
  return Restaurants.findByIdAndUpdate(_id, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// delete a certain restaurant
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  return Restaurants.findByIdAndDelete(_id, req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

export { router as restaurantRoute }
