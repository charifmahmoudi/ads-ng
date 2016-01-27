'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ZoneSchema = new mongoose.Schema({
    name: String,
    center: {
        lat: Number,
        lng: Number
    },
    radius: String,
    info: String,
    active: Boolean,
    date: { type: Date, default: Date.now },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

export default mongoose.model('Zone', ZoneSchema);
