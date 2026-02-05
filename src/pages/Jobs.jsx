import { jobs } from "../data/jobs"
import { Link } from "react-router-dom"

export default function Jobs() {
  return (
    <div className="page">
      <h2 >Open Positions</h2>
<div className="jobs">
      {jobs.map((job) => (
        <div key={job.id} style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "12px" }}>
          <h3>{job.title}</h3>
          <p>{job.location}</p>
          <p>{job.description}</p>

          <Link to={`/apply/${job.id}`}>
            <button>Apply</button>
          </Link>
        </div>
      ))}
    </div>
    </div>
  )
}
