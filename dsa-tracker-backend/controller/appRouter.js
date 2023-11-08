const express = require('express')
const modelData = require('../models/appModels')
const router = express.Router()

router.get('/login', (req, res) => {
    const email = req.get('email')
    const password = req.get('password')
    const usersInfoModel = modelData['usersInfoModel']
    usersInfoModel.find({ email, password }).select('_id name email')
        .then(userInfo => {
            res.send(userInfo);
        }).catch(error => {
            res.status(500).send(error)
        })
})

router.post('/register', (req, res) => {
    const requestData = req.body
    const email = requestData['email']
    const usersInfoModel = modelData['usersInfoModel']
    usersInfoModel.find({ email })
        .then(userInfo => {
            if (userInfo.length !== 0) {
                res.status(400).send('User with provided email id is already exist')
            } else {

                const newUser = new usersInfoModel({
                    name: requestData['name'],
                    email: requestData['email'],
                    password: requestData['password']
                })
                newUser.save()
                    .then(data => {
                        res.send('Registration is successful. Sign in with your email and password')
                    }).catch(error => {
                        res.status(500).send(error);
                    })
            }
        })
})

router.post('/save', (req, res) => {
    const requestData = req.body
    const entryModel = modelData['logEntryModel']
    const newEntry = new entryModel({
        question: requestData['question'],
        link: requestData['link'],
        topic: requestData['topic'],
        complexity: requestData['complexity'],
        note: requestData['note'],
        status: requestData['status']
    })

    newEntry.save()
        .then(data => {
            res.send('Data saved successfully')
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

router.post('/update/:id', (req, res) => {
    const requestData = req.body
    const entryModel = modelData['logEntryModel']
    const updatedEntry = {
        question: requestData['question'],
        category: requestData['category'],
        notes: requestData['notes'],
        complexity: requestData['complexity'],
        status: requestData['status']
    }
    const entryId = req.params.id;

    entryModel.findByIdAndUpdate(entryId, updatedEntry, { new: true })
        .then(data => {
            res.send('Data updated successfully');
        })
        .catch(error => {
            res.status(500).send(error);
        });
})

router.get('/find', (req, res) => {
    const entryModel = modelData['logEntryModel']
    entryModel.find()
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

module.exports = router