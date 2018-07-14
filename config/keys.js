// keys.js - figure out what set of credentials to return


if (process.env.NODE_ENV === 'production') {
    //prod - return prod keys
    module.exports = require('./prod')
} else {
    //dev - return development keys
    module.exports = require('./dev')
}