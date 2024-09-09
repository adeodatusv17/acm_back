require('dotenv').config();
console.log('Server is running...');

const express = require('express');
const cors = require('cors');
const app = express();
const adminRouter = require("./routes/admin.js");
const applicantRouter = require("./routes/applicant.js");
const interviewRouter = require("./routes/interview.js");
const sendEmail = require("./nodemailer/email.js");

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use("/admin", adminRouter);
app.use("/applicant", applicantRouter);
app.use("/interview", interviewRouter);

app.post('/send-email', async (req, res) => {
    const { to, subject, message } = req.body;
    try {
        await sendEmail(to, subject, message);
        console.log('Email sent successfully to:', to);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email', error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});