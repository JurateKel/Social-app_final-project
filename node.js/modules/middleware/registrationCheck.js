const registrationSchema = require('../../models/registrationSchema')

module.exports = async (req, res, next) => {
    const user = req.body

    if(user.userName.length < 4 ) return res.send({error: true, message: 'User name must contain at least 4 letters'})
    if (await registrationSchema.findOne({userName: user.userName})) return res.send({user: null, error: true, message: 'Such user name already exist'})

    if(user.passOne.length < 5) return res.send({error: true, message: 'Password is too short. Password must contain 5 symbols or more.'})
    
    next()
}