import { useLocation } from "react-router-dom"

export default function ThankYou() {
  const { state } = useLocation()

  return (
    <div>
      <h2>Thank You for Applying 🎉</h2>
      <p>Your application has been submitted successfully.</p>

      {state?.applicationId && (
        <p>
          <strong>Application ID:</strong> {state.applicationId}
        </p>
      )}
    </div>
  )
}
