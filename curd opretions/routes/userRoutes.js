const express = require('express');
const router = express.Router();

const User = require('../models/User');


// =======================================
// 1. CREATE USER API
// POST /api/users
// =======================================

router.post('/', async (req, res) => {

    try {

        const user = new User(req.body);

        const savedUser = await user.save();

        res.status(201).json(savedUser);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// =======================================
// 2. READ USERS API
// GET /api/users
// =======================================

router.get('/', async (req, res) => {

    try {

        const users = await User.find();

        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// =======================================
// 3. UPDATE USER API
// PUT /api/users/:id
// =======================================

router.put('/:id', async (req, res) => {

    try {

        const updatedUser = await User.findByIdAndUpdate(

            req.params.id,
            req.body,
            { new: true }

        );

        res.json(updatedUser);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// =======================================
// 4. DELETE USER API
// DELETE /api/users/:id
// =======================================

router.delete('/:id', async (req, res) => {

    try {

        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: "User Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;
// ======================================================
// USER API ROUTES CHEAT SHEET
// ======================================================

// BASE URL
// http://localhost:3000/api/users


// ======================================================
// 1. CREATE USER
// ======================================================

// METHOD: POST
// URL:
// http://localhost:3000/api/users

// BODY (JSON):
/*

{
    "name": "Keshav",
    "email": "keshav@gmail.com",
    "age": 21
}

*/


// ======================================================
// 2. GET ALL USERS
// ======================================================

// METHOD: GET
// URL:
// http://localhost:3000/api/users


// ======================================================
// 3. GET USER BY ID
// ======================================================

// METHOD: GET
// URL:
// http://localhost:3000/api/users/USER_ID

// EXAMPLE:
// http://localhost:3000/api/users/68251d0f8d9f4a4e12d11111


// ======================================================
// 4. UPDATE USER
// ======================================================

// METHOD: PUT
// URL:
// http://localhost:3000/api/users/USER_ID

// BODY (JSON):
/*

{
    "name": "Keshav Updated",
    "age": 22
}

*/


// ======================================================
// 5. DELETE USER
// ======================================================

// METHOD: DELETE
// URL:
// http://localhost:3000/api/users/USER_ID

// EXAMPLE:
// http://localhost:3000/api/users/68251d0f8d9f4a4e12d11111


// ======================================================
// 6. SEARCH USER BY NAME
// ======================================================

// METHOD: GET
// URL:
// http://localhost:3000/api/users/search/Keshav


// ======================================================
// 7. DELETE ALL USERS
// ======================================================

// METHOD: DELETE
// URL:
// http://localhost:3000/api/users


// ======================================================
// HTTP METHODS MEANING
// ======================================================

// GET     -> READ DATA
// POST    -> CREATE DATA
// PUT     -> UPDATE DATA
// DELETE  -> DELETE DATA


// ======================================================
// POSTMAN SETTINGS
// ======================================================

// FOR POST & PUT:
// Body -> raw -> JSON

// HEADER:
// Content-Type : application/json


// ======================================================
// MONGODB COMMANDS
// ======================================================

// START MONGOSH
// mongosh

// SHOW DATABASES
// show dbs

// USE DATABASE
// use studentDB

// SHOW COLLECTIONS
// show collections

// SHOW USERS DATA
// db.users.find()

// FORMATTED DATA
// db.users.find().pretty()

// DELETE ALL USERS
// db.users.deleteMany({})


// ======================================================
// RUN SERVER
// ======================================================

// START SERVER
// node server.js

// START WITH NODEMON
// nodemon server.js