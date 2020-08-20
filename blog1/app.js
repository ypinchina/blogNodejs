let httpServerHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')
}
module.exports = httpServerHandle
//env: process.env.NODE_ENV