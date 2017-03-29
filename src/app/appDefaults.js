var netAddress = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

module.exports = {
    netAddress,
    endpoint: 'endpoint'
}