

module.exports = async (req, res, next) => {

    const {photo} = req.body
    if ( photo.length === 0 ) return res.send({error: true, message: 'Image url field can not be empty'})
    
    next()
}

