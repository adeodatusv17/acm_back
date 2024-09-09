const express = require('express');
const { Admin } = require("../db/index.js");
const adminMiddleware = require("../middlewares/admin.js");
const router = express.Router();

router.get('/count', async (req, res) => {
    try {
      const count = await Admin.countDocuments();
      res.json({ count });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching count' });
    }
  });
  
  
//  Create a new admin
router.post('/register', async function(req, res) {
    console.log("Received POST request to /admin/login");
    console.log("Request body:", req.body);
    try {
        const username = req.body.username;
        // const password = req.body.password;
        const existingAdmin = await Admin.findOne({ username
        });
        if(existingAdmin){
            return res.status(400).send("Admin already exists");
        }
        await Admin.create({ username });
        res.status(201).send("Admin Created successfully");
    } catch (error) {
        res.status(500).send("Error creating admin: " + error.message);
    }
});

//login an existing admin
// router.post('/login', async function(req,res){
//     console.log("Received post request to /admin/login");
//     console.log("Request body:", req.body);
   
//         const {username,password} = req.body;
//         const admin = await Admin.findOne({username,password});
//         if(admin){
//             res.status(200).send("Login Successful");
//     }
//     else{
//         res.status(401).send("Invalid Credentials");
//     }
// });




// Get a list of all admins
router.get('/admins', async function(req, res) {
    const admins = await Admin.find();
    res.send(admins);
});

//  Delete an admin by username
router.delete('/delete/:username',  async function(req, res) {
    await Admin.deleteOne({ username: req.params.username });
    res.send("Admin Deleted Successfully");
});

module.exports = router;
