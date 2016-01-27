'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var CampaignSchema = new mongoose.Schema({
    name: String,
    info: String,
    active: Boolean,
    date: { type: Date, default: Date.now },
    zones: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Zone'
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});


export default mongoose.model('Campaign', CampaignSchema);
