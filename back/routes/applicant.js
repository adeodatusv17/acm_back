const express = require('express');
const { Applicant } = require("../db/index.js");
const {Interview} = require("../db/index.js");
const {sendEmail} = require('../nodemailer/email.js');
const applicantMiddleware = require("../middlewares/applicant.js");
const router = express.Router();




router.get('/count', async (req, res) => {
    try {
      const count = await Applicant.countDocuments();
      res.json({ count });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching count' });
    }
  });
//get a list of all applicants
router.get('/getapplicant', async function(req, res) {
    try {
        const applicants = await Applicant.find();
        res.status(200).json(applicants);
    } catch (error) {
        res.status(500).send("Error retrieving applicants");
    }
});
//add an applicant
router.post('/addapplicant', async function(req, res) {
    try {
        const applicant = new Applicant(req.body);
        await applicant.save();
        res.status(201).send("Applicant Added Successfully");
    } catch (error) {
        res.status(400).send("Error adding applicant");
    }
});
// get applicant by ID
router.get('/applicant/:uid', applicantMiddleware, async function(req, res) {
    try {
        const applicant = await Applicant.findOne({ uid: req.params.uid });
        if (applicant) {
            res.status(200).json(applicant);
        } else {
            res.status(404).send("Applicant not found");
        }
    } catch (error) {
        res.status(500).send("Error retrieving applicant");
    }
});

router.get('/notDone', async function(req, res) {
    try{
        const applicant = await Interview.find({done:false});
        const uid=[...new Set(Interview.map(Interview=>Interview.applicantUid))];   
        const remaining=  await Applicant.find({ uid: { $in: uid } });
        const email=remaining.map(applicant=>applicant.email);
        for (const email of emails) {
            sendEmail(email, 'Reminder', 'You have pending interviews.');
          }
      
          res.json({ message: 'Reminders sent successfully!' });
        } catch(error){
            res.status(404).send("Error sending reminders");
        }});
        
    

// get applicant by UID
router.put('/applicant/:uid', applicantMiddleware, async function(req, res) {
    try {
        const result = await Applicant.updateOne({ uid: req.params.uid }, req.body);
        if (result.nModified > 0) {
            res.status(200).send("Applicant Updated Successfully");
        } else {
            res.status(404).send("Applicant not found or no changes made");
        }
    } catch (error) {
        res.status(500).send("Error updating applicant");
    }
});

// delete applicant by UID
router.delete('/delete/:uid', async function(req, res) {
    try {
        const result = await Applicant.deleteOne({ uid: req.params.uid });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Applicant Deleted Successfully" });
        } else {
            res.status(404).json({ message: "Applicant not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting applicant", error });
    }
});


module.exports = router;
