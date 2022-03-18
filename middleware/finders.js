const User = require('../models/User')

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)

    if (!user) res.status(404).json({ msg: "Could not find user" })
    } catch (error) {
        res.status(500).json({ msg: error.msg })
    }
    res.user = user
    next()
}

module.exports = getUser