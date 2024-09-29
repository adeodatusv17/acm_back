const express = require('express');
const cors = require('cors');
const { Applicant } = require("../back/db/index.js");
const sendEmail = require("./nodemailer/email.js");
const app = express();

const adminRouter = require("./routes/admin.js");
const applicantRouter = require("./routes/applicant.js");
const interviewRouter = require("./routes/interview.js");


require('dotenv').config();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/applicant", applicantRouter);
app.use("/interview", interviewRouter);

app.post('/send-email', async (req, res) => {
    const { subject, message, role, completionStatus } = req.body;
    try {
        let query = {};
        
        if (role) {
            query.role = role;
        }
        
        if (completionStatus !== undefined) {
            query.done = completionStatus;
        }
        
        const applicants = await Applicant.find(query);
        
        for (const applicant of applicants) {
            await sendEmail(applicant.email, subject, message);
            console.log('Email sent successfully to:', applicant.email);
        }
        
        res.status(200).json({ message: `Emails sent successfully to ${applicants.length} applicants` });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ message: 'Error sending emails', error: error.message });
    }
});

app.get('/applicants-by-role/:role', async (req, res) => {
    try {
        const applicants = await Applicant.find({ role: req.params.role });
        res.json(applicants);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applicants', error: error.message });
    }
});

app.get('/applicants-by-completion/:status', async (req, res) => {
    try {
        const status = req.params.status === 'true';
        const applicants = await Applicant.find({ done: status });
        res.json(applicants);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applicants', error: error.message });
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
