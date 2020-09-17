'use strict'

const mongoose = require('mongoose')
const User = require('./user')

const Schema = mongoose.Schema

const workOutSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  reps: {
    type: Number,
    required: false
  },
  minutes: {
    type: Number,
    required: false
  },
  content: {
    type: String,
    required: false
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const characterSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: false
  },
  health: {
    type: Number,
    required: false
  },
  strength: {
    type: Number,
    required: false
  },
  stamina: {
    type: Number,
    required: false
  },
  magick: {
    type: Number,
    required: false
  },
  healing: {
    type: Number,
    required: false
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  workOuts: [workOutSchema]
})

const Character = mongoose.model('Character', characterSchema)

module.exports = Character
