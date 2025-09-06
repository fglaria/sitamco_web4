import './LoadingSpinner.css'

/**
 * Modern, elegant loading spinner component
 * @param {Object} props - Component props
 * @param {string} props.size - Size variant: 'sm', 'md', 'lg' (default: 'md')
 * @param {string} props.variant - Style variant: 'primary', 'secondary', 'light' (default: 'primary')
 * @param {string} props.text - Optional loading text
 * @param {boolean} props.fullScreen - Whether to display as full-screen overlay (default: false)
 * @returns {JSX.Element} LoadingSpinner JSX element
 */
function LoadingSpinner({ 
  size = 'md', 
  variant = 'primary', 
  text = 'Loading...', 
  fullScreen = false 
}) {
  const containerClass = fullScreen 
    ? 'loading-spinner-container full-screen' 
    : 'loading-spinner-container'

  return (
    <div className={containerClass}>
      <div className="loading-content">
        <div className={`modern-spinner ${size} ${variant}`}>
          <div className="spinner-ring">
            <div className="spinner-segment"></div>
            <div className="spinner-segment"></div>
            <div className="spinner-segment"></div>
            <div className="spinner-segment"></div>
          </div>
          <div className="spinner-glow"></div>
        </div>
        {text && (
          <p className="loading-text">{text}</p>
        )}
      </div>
    </div>
  )
}

export default LoadingSpinner