const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.session.token
        const decoded = jwt.verify(token, process.env.VERIFY_TOKEN)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    }
    catch (e) {
        res.render("login", { e });
    }
}

module.exports = auth