// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Character = require('../models/character')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()



// CREATE
// POST /examples
router.post('/characters/:id/work-outs', requireToken, (req, res, next) => {
  // set owner of new example to be current user
  req.body.workOut.owner = req.user.id
  const newWorkOut = req.body.workOut
  Character.findById(req.params.id)
    .then(character => {
      character.workOuts.push(newWorkOut)
      return character.save()
    })
    .then(function (character) {
      let cardio = 0
      let strength = 0
        if (newWorkOut.type === 'cardio'){
          cardio += newWorkOut.minutes
        } else {
          strength += newWorkOut.minutes
        }
      if (character.class === 'Mage') {
        character.health += (strength*.3)
        character.strength += (strength*.7)
        character.stamina += (cardio*.3)
        character.magick += (cardio*.6)
        character.healing  += (cardio*.1)
      } else if (character.class === 'Knight') {
        character.health += (strength*.7)
        character.strength += (strength*.3)
        character.stamina += (cardio*.6)
        character.magick += (cardio*.1)
        character.healing  += (cardio*.3)
      } else if (character.class === 'Priest') {
        character.health += (strength*.8)
        character.strength += (strength*.2)
        character.stamina += (cardio*.2)
        character.magick += (cardio*.1)
        character.healing  += (cardio*.7)
      } else if (character.class === 'Archer') {
        character.health += (strength*.2)
        character.strength += (strength*.8)
        character.stamina += (cardio*.8)
        character.magick += (cardio*.1)
        character.healing  += (cardio*.1)
      } else if (character.class === 'Warrior') {
        character.health += (strength*.4)
        character.strength += (strength*.6)
        character.stamina += (cardio*.8)
        character.magick += (cardio*.1)
        character.healing += (cardio*.1)
      }
      return character.save()
    })
    // respond to succesful `create` with status 201 and JSON of new "example"
    .then(character => {
      res.status(201).json({ character: character.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /examples/5a7db6c74d55bc51bdf39793
router.patch('/characters/:id/work-outs/:workoutid', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.workOut.owner
  const workOutId = req.params.workoutid
  const characterId = req.params.id
  const workOutUpdate = req.body.workOut
  console.log(req.body)
  Character.findById(characterId)
    .then(handle404)
    .then(function (character) {
      let cardio = 0
      let strength = 0
        if (character.workOuts.id(workOutId).type === 'cardio'){
          cardio += character.workOuts.id(workOutId).minutes
        } else {
          strength += character.workOuts.id(workOutId).minutes
        }
      if (character.class === 'Mage') {
        character.health -= (strength*.3)
        character.strength -= (strength*.7)
        character.stamina -= (cardio*.3)
        character.magick -= (cardio*.6)
        character.healing  -= (cardio*.1)
      } else if (character.class === 'Knight') {
        character.health -= (strength*.7)
        character.strength -= (strength*.3)
        character.stamina -= (cardio*.6)
        character.magick -= (cardio*.1)
        character.healing  -= (cardio*.3)
      } else if (character.class === 'Priest') {
        character.health -= (strength*.8)
        character.strength -= (strength*.2)
        character.stamina -= (cardio*.2)
        character.magick -= (cardio*.1)
        character.healing  -= (cardio*.7)
      } else if (character.class === 'Archer') {
        character.health -= (strength*.2)
        character.strength -= (strength*.8)
        character.stamina -= (cardio*.8)
        character.magick -= (cardio*.1)
        character.healing  -= (cardio*.1)
      } else if (character.class === 'Warrior') {
        character.health -= (strength*.4)
        character.strength -= (strength*.6)
        character.stamina -= (cardio*.8)
        character.magick -= (cardio*.1)
        character.healing -= (cardio*.1)
      }
      return character.save()
    })
    .then(character => {
      character.workOuts.id(workOutId).date = workOutUpdate.date
      character.workOuts.id(workOutId).type = workOutUpdate.type
      character.workOuts.id(workOutId).title = workOutUpdate.title
      character.workOuts.id(workOutId).reps = workOutUpdate.reps
      character.workOuts.id(workOutId).minutes = workOutUpdate.minutes
      character.workOuts.id(workOutId).content = workOutUpdate.content
      return character.save()
    })
    .then(function (character) {
      let cardio = 0
      let strength = 0
        if (workOutUpdate.type === 'cardio'){
          cardio += workOutUpdate.minutes
        } else {
          strength += workOutUpdate.minutes
        }
      if (character.class === 'Mage') {
        character.health += (strength*.3)
        character.strength += (strength*.7)
        character.stamina += (cardio*.3)
        character.magick += (cardio*.6)
        character.healing  += (cardio*.1)
      } else if (character.class === 'Knight') {
        character.health += (strength*.7)
        character.strength += (strength*.3)
        character.stamina += (cardio*.6)
        character.magick += (cardio*.1)
        character.healing  += (cardio*.3)
      } else if (character.class === 'Priest') {
        character.health += (strength*.8)
        character.strength += (strength*.2)
        character.stamina += (cardio*.2)
        character.magick += (cardio*.1)
        character.healing  += (cardio*.7)
      } else if (character.class === 'Archer') {
        character.health += (strength*.2)
        character.strength += (strength*.8)
        character.stamina += (cardio*.8)
        character.magick += (cardio*.1)
        character.healing  += (cardio*.1)
      } else if (character.class === 'Warrior') {
        character.health += (strength*.4)
        character.strength += (strength*.6)
        character.stamina += (cardio*.8)
        character.magick += (cardio*.1)
        character.healing += (cardio*.1)
      }
      return character.save()
    })
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /examples/5a7db6c74d55bc51bdf39793
router.delete('/characters/:id/work-outs/:workoutid', requireToken, (req, res, next) => {
  const characterId = req.params.id
  const workOutId = req.params.workoutid
  Character.findById(characterId)
    .then(handle404)
    .then(function (character) {
      let cardio = 0
      let strength = 0
        if (character.workOuts.id(workOutId).type === 'cardio'){
          cardio += character.workOuts.id(workOutId).minutes
        } else {
          strength += character.workOuts.id(workOutId).minutes
        }
      if (character.class === 'Mage') {
        character.health -= (strength*.3)
        character.strength -= (strength*.7)
        character.stamina -= (cardio*.3)
        character.magick -= (cardio*.6)
        character.healing  -= (cardio*.1)
      } else if (character.class === 'Knight') {
        character.health -= (strength*.7)
        character.strength -= (strength*.3)
        character.stamina -= (cardio*.6)
        character.magick -= (cardio*.1)
        character.healing  -= (cardio*.3)
      } else if (character.class === 'Priest') {
        character.health -= (strength*.8)
        character.strength -= (strength*.2)
        character.stamina -= (cardio*.2)
        character.magick -= (cardio*.1)
        character.healing  -= (cardio*.7)
      } else if (character.class === 'Archer') {
        character.health -= (strength*.2)
        character.strength -= (strength*.8)
        character.stamina -= (cardio*.8)
        character.magick -= (cardio*.1)
        character.healing  -= (cardio*.1)
      } else if (character.class === 'Warrior') {
        character.health -= (strength*.4)
        character.strength -= (strength*.6)
        character.stamina -= (cardio*.8)
        character.magick -= (cardio*.1)
        character.healing -= (cardio*.1)
      }
      return character.save()
    })
    .then(character => {
      character.workOuts.id(workOutId).remove()
      return character.save()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// INDEX
router.get('/characters/:id/work-outs', requireToken, (req, res, next) => {
  const characterId = req.params.id
  Character.findById(characterId)
    .then(character => {
      // `examples` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return post.workOuts.map(workOuts => workOuts.toObject())
    })
    // respond with status 200 and JSON of the examples
    .then(post => res.status(200).json({ character: character }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
