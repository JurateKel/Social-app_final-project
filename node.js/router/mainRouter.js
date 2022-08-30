const express = require('express')
const router = express.Router()
const {register, login, logout, sessionUser, cities, profile, uploadPhoto, setFilterHistory, filterUsers, love, history } = require('../controller/mainController')
const RegistrationCheck = require('../modules/middleware/registrationCheck')
const LoginCheck = require('../modules/middleware/loginCheck')
const ImageCheck = require('../modules/middleware/imageCheck')

router.post('/registration', RegistrationCheck, register)
router.post('/login', LoginCheck, login)
router.post('/profile', profile)
router.post('/uploadPhoto', ImageCheck, uploadPhoto)
router.post('/filter', setFilterHistory)
router.post('/search', filterUsers)
router.post('/love', love)
router.post('/history', history)
router.get('/logout', logout)
router.get('/sessionUser', sessionUser)
router.get('/cities', cities)


module.exports = router