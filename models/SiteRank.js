var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SiteRankSchema = new Schema({
    URI: {
        type: String,
        required: true
    },
    RecordDate: {
        type: String,
        required: true
    },
    RecordDT: Date,
    Rank: {
        Global: {
            type: Number,
            required: true
        },
        US: {
            type: Number,
            required: true
        }
    }
});

var SiteRank = mongoose.model('SiteRank', SiteRankSchema, 'SiteRank');

module.exports = SiteRank;