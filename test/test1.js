var config = require('/home/ubuntu/Documents/Adwait/project/mean2-seed/config/config.json'); //WE IMPORTED OBJECT FROM CONFIG AS CONFIG...
// import * as config from '/home/ubuntu/Documents/Adwait/project/mean2-seed/config/config.js';
console.log(config.MONGO_URI.DEVELOPMENT);
console.log(config.MONGO_URI.PRODUCTION);

const testURI = config.MONGO_URI.TEST;

const mongoose = require('mongoose');



