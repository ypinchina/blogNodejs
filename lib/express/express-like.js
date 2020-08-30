const http = require('http')
const slice = Array.prototype.slice
class ExpressLike {
    constructor() {
        this.routers = {
            all: [],
            get: [],
            post: []
        }

    }
    register(path) {
        const info = {}
        if( typeof path === 'string') {
            info.path = path
            info.stack = slice.call(arguments, 1)
        } else {
            info.path = '/'
            info.stack = slice.call(arguments, 0)
        }
        return info
    }
    use() {}
    get() {}
    post() {}
    listen(){}
}
module.exports = new ExpressLike()
