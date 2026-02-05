import { jobs } from "../data/jobs"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function Apply() {
  const { jobId } = useParams()
  const job = jobs.find((job) => job.id === jobId)
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
    portfolio: "",
    resume: null,
  })

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  function handleResumeUpload(e) {
    const file = e.target.files[0]
    if (!file) return

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF or DOC files are allowed")
      return
    }

    setFormData({
      ...formData,
      resume: file.name,
    })
  }

  function generateApplicationId() {
    return "APP-" + Math.floor(100000 + Math.random() * 900000)
  }
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isOnlyLetters(text) {
  return /^[A-Za-z\s]+$/.test(text)
}

function isOnlyNumbers(text) {
  return /^[0-9]+$/.test(text)
}

  function validateStep() {
  if (step === 1) {
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all personal details")
      return false
    }

    if (!isOnlyLetters(formData.fullName)) {
      alert("Full name should contain letters only")
      return false
    }

    if (!isValidEmail(formData.email)) {
      alert("Please enter a valid email address")
      return false
    }

    if (!isOnlyNumbers(formData.phone)) {
      alert("Phone number should contain numbers only")
      return false
    }

    return true
  }

  if (step === 2) {
    if (!formData.experience || !formData.skills) {
      alert("Please add your experience and skills")
      return false
    }

    if (!isOnlyNumbers(formData.experience)) {
      alert("Experience should be a number")
      return false
    }

    if (!isOnlyLetters(formData.skills.replace(/,/g, ""))) {
      alert("Skills should contain letters only")
      return false
    }

    return true
  }

  if (step === 3) {
    if (!formData.resume) {
      alert("Please upload your resume")
      return false
    }
    return true
  }

  return true
}

  function handleSubmit() {
    if (!validateStep()) return

    const application = {
      id: generateApplicationId(),
      jobId: job.id,
      jobTitle: job.title,
      ...formData,
      status: "Applied",
      createdAt: new Date().toISOString(),
    }

    const existing =
      JSON.parse(localStorage.getItem("applications")) || []

    localStorage.setItem(
      "applications",
      JSON.stringify([...existing, application])
    )

    navigate("/thank-you", {
      state: { applicationId: application.id },
    })
  }

  if (!job) {
    return <p>Job not found</p>
  }

  return (
    <div className="page">
      <h2>Apply for {job.title}</h2>
      <p>{job.location}</p>
      <p>{job.description}</p>
      <p>Step {step} of 3</p>

      {step === 1 && (
        <div>
          <h3>Personal Information</h3>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />

          <br /><br />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <br /><br />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <br /><br />

          <button
            onClick={() => {
              if (validateStep()) setStep(2)
            }}
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Experience & Skills</h3>

          <input
            type="number"
            name="experience"
            placeholder="Years of Experience"
            value={formData.experience}
            onChange={handleChange}
          />

          <br /><br />

          <input
            type="text"
            name="skills"
            placeholder="Skills (e.g. React, CSS, JavaScript)"
            value={formData.skills}
            onChange={handleChange}
          />

          <br /><br />

          <input
            type="url"
            name="portfolio"
            placeholder="Portfolio Link"
            value={formData.portfolio}
            onChange={handleChange}
          />

          <br /><br />

          <button onClick={() => setStep(1)}>Back</button>
          &nbsp;
          <button
            onClick={() => {
              if (validateStep()) setStep(3)
            }}
          >
            Next
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>Resume Upload</h3>
          <input type="file" onChange={handleResumeUpload} />

          {formData.resume && <p>Uploaded: {formData.resume}</p>}

          <br /><br />

          <button onClick={() => setStep(2)}>Back</button>
          &nbsp;
          <button onClick={handleSubmit}>Submit Application</button>
        </div>
      )}
    </div>
  )
}
