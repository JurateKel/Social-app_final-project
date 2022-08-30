const res = require('express/lib/response')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')
const registrationSchema = require('../models/registrationSchema')
const historySchema = require('../models/historySchema')
const cities = require('../assets/cities.json')


let users = []

module.exports = {

    register: async (req, res) => {
        const user = req.body
        async function encryptPassword() {
            const encryptPassword = await bcrypt.hash(user.passOne, 10)
            return encryptPassword
        }
        const newUser = new registrationSchema
        newUser.userName = user.userName
        newUser.password = await encryptPassword()
        newUser.defaultPhoto = user.gender === 'female' ? 'https://cdn4.iconfinder.com/data/icons/cosmetology-set/52/cosmetology-02-512.png' : 'https://mpng.subpng.com/20180608/ht/kisspng-computer-icons-icon-design-clip-art-jamia-millia-islamia-5b1b0cf18848e6.5283255915284994415582.jpg'
        newUser.photo = []
        newUser.gender = user.gender
        newUser.city = user.city
        newUser.age = user.age
        newUser.filter = []

        try {
            newUser.save()
            res.send({error: false})
        } catch (error) {
            return res.send({user: null, error: true, message: error})
        }
    },
    login: async (req, res) => {
        const user = req.body
        if (user.stayLogged) req.session.user = user.userName
        else req.session.user = null
        res.send({ error: false })
    },
    logout: (req, res) => {
        req.session.user = null;
        res.send({user: req.session.user});
      },
    sessionUser: (req, res) => {
        if (!req.session.user) req.session.user = null
        res.send({user: req.session.user})
    },
    cities: async (req, res) => {
        res.send(cities)
    },
    profile: async (req, res) => {

        let user
        if (req.session.user === null) {
            user = req.body.currentUser;
        } else {
            user = req.session.user;
        }
        if (!user) return res.send({ error: true, message: 'Profile not found' });
        const profile = await registrationSchema.findOne({ userName: user });

        res.send( profile );
    },
    uploadPhoto: async (req, res) => {
        const { name, photo } = req.body;
        let user = await registrationSchema.findOne({ userName: name });
        try {
            await registrationSchema.updateOne({ userName: name }, { $push: { photo: {$each : [photo], $position: 0} }});
        } catch (error) {
        return res.send({error: true, message: error})
        }
        
        res.send({ error: false, profile: user });
    },
    setFilterHistory: async (req, res) => {
      const { userName, city, gender, age } = req.body;
      const user = await registrationSchema.findOne({userName: userName})
      const filterHistory = {
        city,
        gender,
        age,
      };
      if (!user) return res.send({error: true, message: 'User not found'})
      try {
        await registrationSchema.findOneAndUpdate(
          { userName: user.userName },
          { $set: { filter: filterHistory } }
        );
        res.send({ error: false });
      } catch (error) {
        res.send({ error: true, message: error });
      }
    },
    filterUsers: async (req, res) => {
      let user 
      if (req.session.user === null) {
          user = req.body.userName;
      } else {
          user = req.session.user;
      }
      if (!user) return res.send({ error: true, message: "User not found"});
      const userProfile = await registrationSchema.findOne({ userName: user });
      const users = await registrationSchema.find()
      const history = await historySchema.find()
      
      let filteredUsers
      if (userProfile.filter.length === 0) filteredUsers = users.filter(x => x.userName !== user)
      else filteredUsers = await registrationSchema.find({
        $and: [
          { city: userProfile.filter[0].city },
          { gender: userProfile.filter[0].gender },
          { age: {$gte: Number(userProfile.filter[0].age)}},
          { userName: {$ne: user}}
        ],
      });
      const filteredUsersAfterHistory = []
      filteredUsers.map(x => {
        history.map(y => y.match !== x.userName ? filteredUsersAfterHistory.push(x) : x )
      })
      console.log(filteredUsersAfterHistory);
      // reikia isfiltruoti history user'ius is filteredUsers , kad nemestu jau palaikintu useriu.
      res.send({ error: false, filteredUsers });
      if (!filteredUsers) res.send({error: true, message: "No users match the creteria"})
    },
    love: async (req, res) => {
      const {user, match} = req.body
      const userProfile = await registrationSchema.findOne({userName:user})
      const matchProfile = await registrationSchema.findOne({userName:match})
      const newLove = new historySchema
      newLove.user = user
      newLove.match = match
      newLove.action = 'love'
      if (!userProfile || !matchProfile) return res.send({error: true, message: 'User or selected user not found'})
      try {
        newLove.save()
        return res.send({error: false})
      } catch (error) {
        return res.send({ error: true, message: error })
      }
    },
    history: async (req, res) => {
      let user
      if (req.session.user === null) {
          user = req.body.user;
      } else {
          user = req.session.user;
      }
      if (!user) return res.send({ error: true, message: 'Profile not found' });
      const allHistory = await historySchema.find();
      const allUsers = await registrationSchema.find();
      const iLoveHistory = allHistory.filter(x => x.user === user)
      console.log(iLoveHistory);
      const lovesMeHistory = allHistory.filter(x => x.match === user)
      const iLove = []
      allUsers.map(x => iLoveHistory.map(y => y.match === x.userName ? iLove.push(x) : y))
      const lovesMe = []
      allUsers.map(x => lovesMeHistory.map(y => y.user === x.userName ? lovesMe.push(x) : y))

      res.send( {iLove, lovesMe} );

 }}