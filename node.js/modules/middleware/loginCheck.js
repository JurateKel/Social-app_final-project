const registrationSchema = require('../../models/registrationSchema')
const bcrypt = require('bcrypt')

module.exports = async (req, res, next) => {

    const user = req.body

    const loginUser = await registrationSchema.findOne({userName: user.userName})
    if ( !loginUser) return res.send({user: null, error: true, message: 'Such user do not exist'})
    
    const passwordMatch = await bcrypt.compare(user.password, loginUser.password)
    if (!passwordMatch) return res.send({error: true, message: 'password is incorrect'})

    next()
}


