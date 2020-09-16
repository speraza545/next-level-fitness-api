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
    required: true
  },
  health: {
    type: Number,
    required: true
  },
  strength: {
    type: Number,
    required: true
  },
  stamina: {
    type: Number,
    required: true
  },
  magick: {
    type: Number,
    required: true
  },
  healing: {
    type: Number,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  workOuts: [workOutSchema]
})

const Character = mongoose.model('Character', characterSchema)

module.exports = Character
