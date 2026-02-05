import { useEffect, useState } from "react"

export default function Admin() {
  const [applications, setApplications] = useState([])
  const [selectedApp, setSelectedApp] = useState(null)

  const stages = [
    "Applied",
    "Reviewed",
    "Interview Scheduled",
    "Offer Sent",
  ]

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("applications")) || []
    setApplications(saved)
  }, [])

  function persistUpdates(updatedApps, updatedSelected) {
    setApplications(updatedApps)
    setSelectedApp(updatedSelected)
    localStorage.setItem("applications", JSON.stringify(updatedApps))
  }

  function updateStatus(newStatus) {
    if (!selectedApp) return

    const updatedApps = applications.map((app) =>
      app.id === selectedApp.id
        ? { ...app, status: newStatus }
        : app
    )

    persistUpdates(updatedApps, {
      ...selectedApp,
      status: newStatus,
    })
  }

  function updateField(field, value) {
    if (!selectedApp) return

    const updatedApps = applications.map((app) =>
      app.id === selectedApp.id
        ? { ...app, [field]: value }
        : app
    )

    persistUpdates(updatedApps, {
      ...selectedApp,
      [field]: value,
    })
  }

  return (
    <div className="page">
      <div className="admin-wrapper">
        <h2>Recruiter Dashboard</h2>

        <div className="admin-pipeline">
          {stages.map((stage) => (
            <div className="pipeline-column" key={stage}>
              <h3>{stage}</h3>

              {applications
                .filter((app) => app.status === stage)
                .map((app) => (
                  <div
                    key={app.id}
                    className={`pipeline-card ${
                      selectedApp?.id === app.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedApp(app)}
                  >
                    <strong>{app.fullName}</strong>
                    <p>{app.jobTitle}</p>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {selectedApp ? (
          <div className="admin-review">
            <h3>Candidate Review</h3>

            <p><strong>Name:</strong> {selectedApp.fullName}</p>
            <p><strong>Email:</strong> {selectedApp.email}</p>
            <p><strong>Phone:</strong> {selectedApp.phone}</p>
            <p>
              <strong>Experience:</strong> {selectedApp.experience} years
            </p>
            <p><strong>Skills:</strong> {selectedApp.skills}</p>
            <p><strong>Portfolio:</strong> {selectedApp.portfolio}</p>
            <p><strong>Resume:</strong> {selectedApp.resume}</p>

            <label>
              Score (1–5)
              <input
                type="number"
                min="1"
                max="5"
                value={selectedApp.score || ""}
                onChange={(e) =>
                  updateField("score", e.target.value)
                }
              />
            </label>

            <label>
              Notes
              <textarea
                rows="4"
                value={selectedApp.notes || ""}
                onChange={(e) =>
                  updateField("notes", e.target.value)
                }
              />
            </label>

            <label>
              Interview Date & Time
              <input
                type="datetime-local"
                value={selectedApp.interviewDate || ""}
                onChange={(e) =>
                  setSelectedApp({
                    ...selectedApp,
                    interviewDate: e.target.value,
                  })
                }
              />
            </label>

            <div className="admin-actions">
              <button onClick={() => updateStatus("Reviewed")}>
                Mark Reviewed
              </button>

              <button
                onClick={() => {
                  if (!selectedApp.interviewDate) {
                    alert("Please select interview date & time")
                    return
                  }
                  updateField(
                    "interviewDate",
                    selectedApp.interviewDate
                  )
                  updateStatus("Interview Scheduled")
                }}
              >
                Schedule Interview
              </button>

              <button onClick={() => updateStatus("Offer Sent")}>
                Send Offer
              </button>
            </div>
          </div>
        ) : (
          <p className="admin-empty">
            Select a candidate to review
          </p>
        )}
      </div>
    </div>
  )
}
