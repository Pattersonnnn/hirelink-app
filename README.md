# HireLink – Fellowship Frontend Assessment

## Overview
HireLink is a frontend web application that simulates an end-to-end hiring workflow.
It allows candidates to apply for jobs through a multi-step application form and enables recruiters to review applications, manage hiring stages, schedule interviews, and draft offers.

This project was built as part of a frontend assessment focused on state management, form validation, UI logic, and application architecture.

---

## Features

### Candidate Experience
- Job listings with mock data
- Multi-step application form:
  - Personal Information
  - Experience & Skills
  - Resume Upload (PDF/DOC)
- Form validation (required fields, email format, step validation)
- Unique application ID generated on submission
- Thank You confirmation page

### Recruiter (Admin) Experience
- Pipeline board with stages:
  - Applied
  - Reviewed
  - Interview Scheduled
  - Offer Sent
- Candidate review panel:
  - View full application details
  - Score candidates (1–5)
  - Add recruiter notes
- Interview scheduling using date & time picker
- Mock offer letter drafting
- Automatic stage transitions based on recruiter actions

---

## Tech Stack
- **Framework:** React
- **State Management:** React `useState`
- **Routing:** react-router-dom
- **Persistence:** localStorage
- **Forms & Validation:** Controlled components with step-based validation

---

## Setup & Running the Project

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hirelink
