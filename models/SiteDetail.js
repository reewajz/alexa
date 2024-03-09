var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SiteDetailSchema = new Schema({
    SiteURI: {
        type: String,
        required: true
    },
    InsertedDate: {
        type: Date,
        default: Date.now()
    },
    CallTime: Number
});

var SiteDetail = mongoose.model('SiteDetail', SiteDetailSchema, 'SiteDetail');
module.exports = SiteDetail;