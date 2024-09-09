const express = require('express');
const { Admin, Applicant, Interview } = require('../db/index.js');
const router = express.Router();


router.get('/count', async (req, res) => {
    try{
        const count = await Interview.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching count' });

    }});
// Create a new interview
router.post('/add', async (req, res) => {
    const { applicantUid, date, time, location, interviewer } = req.body;

    try {
        // check if applicant exists
        const applicantExists = await Applicant.exists({ uid: applicantUid });
        if (!applicantExists) {
            return res.status(404).send("Applicant not found");
        }

        // check if interviewer exists in /admin
        const interviewerExists = await Admin.exists({ username: interviewer });
        if (!interviewerExists) {
            return res.status(404).send("Interviewer not found in Admin collection");
        }

        // create new interview
        const interview = new Interview({
            applicantUid,
            date,
            time,
            location,
            interviewer 
        });

        await interview.save();
        res.status(201).send("Interview scheduled successfully");
    } catch (error) {
        res.status(500).send("Error scheduling interview: " + error.message);
    }
});

// Get all interviews
router.get('/all', async (req, res) => {
    try {
        const interviews = await Interview.find();
        res.json(interviews);
    } catch (error) {
        res.status(500).send("Error fetching interviews: " + error.message);
    }
});

// Get a specific interview by applicant UID
router.get('/:uid', async (req, res) => {
    try {
        const interview = await Interview.findOne({ applicantUid: req.params.uid });//used UID instead of object id 
        if (!interview) {
            return res.status(404).send("Interview not found");
        }
        res.json(interview);
    } catch (error) {
        res.status(500).send("Error fetching interview: " + error.message);
    }
});

router.put('/update/:uid', async (req, res) => {
    try {
      const { done } = req.body;
      await Interview.updateOne({ _id: req.params.uid }, { $set: { done } });
      res.status(200).send('Interview updated successfully');
    } catch (error) {
      res.status(500).send('Error updating interview');
    }
  });
  
  router.get('/status/:uid', async (req, res) => {//made this to toggle between done and not done
    try {
      const interview = await Interview.findOne({ applicantUid: req.params.uid });//last moment change and I didn't
                                                                                  //want to make many changes 
     if (!interview) {
        return res.status(404).send("Interview not found");
      }
      res.json({ done: interview.done });
    } catch (error) {
      res.status(500).send("Error fetching interview status: " + error.message);
    }
  });
  

// Delete interview by applicant UID
router.delete('/:uid', async (req, res) => {
    try {
        // Delete the interview associated with the applicant UID
        const result = await Interview.findOneAndDelete({ applicantUid: req.params.uid });
        if (!result) {
            return res.status(404).send("Interview not found");
        }
        res.send("Interview deleted successfully");
    } catch (error) {
        res.status(500).send("Error deleting interview: " + error.message);
    }
});

module.exports = router;
