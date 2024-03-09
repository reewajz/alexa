var mongoose = require('mongoose');
var commonConfig = require('./config.json');

let Host = commonConfig.DBURL + commonConfig.DB;

const options = {
    useNewUrlParser: true,
};

mongoose.connect(Host, options);

module.exports = mongoose;