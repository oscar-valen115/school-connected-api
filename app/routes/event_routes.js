const express = require('express')
const passport = require('passport')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const Course = require('../models/course')
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

router.get('/homepage', requireToken, (req, res, next) => {
  console.log('Made it to the homepage')
})

router.get('/courses', requireToken, (req, res, next) => {
  Course.find()
    .populate('owner')
    .then(courses => {
      return courses.map(course => course.toObject())
    })
    .then(courses => res.status(200).json({ courses: courses }))
    .catch(next)
})

// GET /courses/60417f7225f17272bfeb25b0
router.get('/courses/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  const courseId = req.params.id
  Course.findById(courseId)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(course => res.status(200).json({ course: course.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /courses
router.post('/courses', requireToken, (req, res, next) => {
  const courseData = req.body.course
  console.log('courseData info:', courseData)
  courseData.owner = req.user.id
  console.log('Course Owner: ', courseData.owner)
  Course.create(courseData)
    .then(course => {
      res.status(201).json({ course: course.toObject() })
    })
    .catch(next)
})

// PATCH /courses/6041858a75a3c6788557ac68
router.patch('/courses/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.course.owner
  const courseId = req.params.id
  const courseData = req.body.course
  Course.findById(courseId)
    .then(handle404)
    .then(course => {
      requireOwnership(req, course)
      return course.updateOne(courseData)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/courses/:id', requireToken, (req, res, next) => {
  const courseId = req.params.id
  Course.findById(courseId)
    .then(handle404)
    .then(course => {
      requireOwnership(req, course)
      course.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
