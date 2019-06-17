module.exports = function (env, argv) {
    console.log('env----->', env)
    console.log('argv----->', argv)
    return argv.mode === 'production' ? require('./config/webpack.production.js') : require('./config/webpack.development.js')
}