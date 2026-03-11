import React from 'react'
import './LoadingIndicator.css'

interface LoadingIndicatorProps {
  message?: string
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = 'Loading...'
}) => {
  return (
    <div className="loading-indicator">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  )
}
