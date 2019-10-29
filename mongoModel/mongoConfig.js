const Mongoose = require("mongoose") // memanggil library Mongoose

Mongoose.connect('mongodb://localhost/belajarmongo') // connect ke db belajarmongo di mongodb

module.exports = Mongoose; // export module Mongoose

//commit -m "Config mongo dan koneksi ke DB"