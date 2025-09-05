import { createContext, useContext, useEffect, useState } from 'react'

/**
 * Theme context for managing light/dark theme state
 */
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {}
})

/**
 * Custom hook to use theme context
 * @returns {Object} Theme context value
 */
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

/**
 * ThemeProvider component that manages theme state and persistence
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} ThemeProvider JSX element
 */
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or system preference immediately
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('sitamco-theme')
    if (savedTheme) {
      return savedTheme
    }
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return systemPrefersDark ? 'dark' : 'light'
  }
  
  const [theme, setTheme] = useState(getInitialTheme)

  // Load theme from localStorage on mount (backup in case useState didn't work)
  useEffect(() => {
    const savedTheme = localStorage.getItem('sitamco-theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme && savedTheme !== theme) {
      setTheme(savedTheme)
    } else if (!savedTheme && systemPrefersDark && theme !== 'dark') {
      setTheme('dark')
    }
  }, [])

  // Apply theme to document and save to localStorage
  useEffect(() => {
    // Add theme switching class to prevent transition flashing
    document.documentElement.classList.add('theme-switching')
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('sitamco-theme', theme)
    
    // Remove theme switching class after a short delay
    setTimeout(() => {
      document.documentElement.classList.remove('theme-switching')
    }, 100)
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a theme
      const savedTheme = localStorage.getItem('sitamco-theme')
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const value = {
    theme,
    toggleTheme,
    setTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider