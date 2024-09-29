const mongoose= require('mongoose');
const { type } = require('os');
 mongoose.connect("mongodb+srv://opticallyweak:20tatakae23@adeodatusv18.wwwwxtr.mongodb.net/admin2")
 .then(() => console.log("Connected to MongoDB"))
 .catch(err => console.error("MongoDB connection error:", err));

 const AdminSchema = new mongoose.Schema({
    username: String,
    
 });
 
 const ApplicantSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    role: String,
    uid: String,
    done: Boolean
    
    // resume: String
 });
const FeedbackSchema = new mongoose.Schema({
    Feedback: String
});
const InterviewSchema = new mongoose.Schema({
   applicantUid: {
       type: String,
       required: true
   },
   date: {
       type: String,
       required: true
   },
   time: {
       type: String,
       required: true
   },
   location: {
       type: String,
       required: true
   },
   interviewer: {
       type: String,
       ref: 'Admin',
       required: true
   },
    feedback: {
         type: String,
         default: 'Pending'
    },
   done:{
    type: Boolean,
    default: false
   }
});


const Admin = mongoose.model('Admin', AdminSchema);
const Applicant = mongoose.model('Applicant', ApplicantSchema);
const Feedback= mongoose.model('Feedback', FeedbackSchema);
const Interview = mongoose.model('Interview', InterviewSchema);
module.exports = {
    Admin,
    Applicant,
    Feedback,
   Interview};
