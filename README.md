# ACM BACKEND

This is the backend part of the Induction Management App, which powers functionalities like interview management, email reminders, and user tracking. The backend is built using **Express.js** and connects to a **MongoDB** database for managing data such as applicants, admins, and interview schedules. It also includes email functionality to send reminders.

## Features

- **Applicants Management**: API endpoints to add, update, delete, and fetch applicants.
- **Admin/Interviewer Management**: Endpoints to manage interviewer details (admins).
- **Interview Scheduling**: Create, update, and manage interviews.
- **Email Reminders**: Automated email system for sending reminders.
- **Dashboard API**: Provides stats for applicants, admins, and interviews.

## API Endpoints

### Applicants

- `GET /applicant`: Retrieve a list of all applicants.
- `GET /applicant/:uid`: Retrieve details of a specific applicant by UID.
- `POST /applicant`: Add a new applicant.
- `PUT /applicant/:uid`: Update an existing applicant by UID.
- `DELETE /applicant/:uid`: Delete an applicant by UID.

### Admins

- `GET /admin`: Retrieve a list of all admins.
- `POST /admin`: Add a new admin.
- `DELETE /admin/:username`: Delete an admin by username.

### Interviews

- `POST /interview`: Schedule a new interview.
- `GET /interview`: Get all scheduled interviews.
- `GET /interview/:id`: Get a specific interview by ID.
- `PUT /interview/:id`: Update an interview by ID.
- `DELETE /interview/:id`: Delete an interview by ID.

### Dashboard Stats

- `GET /applicant/count`: Get the total number of applicants.
- `GET /admin/count`: Get the total number of admins.
- `GET /interview/count`: Get the total number of interviews.

## Tech Stack

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database to store applicants, admins, and interview data.
- **Nodemailer**: For sending automated email reminders.
- **CORS**: Cross-origin resource sharing for allowing frontend access to the API.

## Environment Variables

The backend uses the following environment variables:

- `EMAIL_USER`: Email address for sending reminders.
- `EMAIL_PASS`: Password for the email account.

## Future Plans

    Add user authentication and authorization.
    Implement rate-limiting and security features.
    Extend the email functionality for custom reminders.
