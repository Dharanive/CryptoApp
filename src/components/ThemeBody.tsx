'use client'
import { useTheme } from '../context/ThemeContext'
import { useEffect } from 'react'

interface ThemeBodyProps {
  children: React.ReactNode
}

export default function ThemeBody({ children }: ThemeBodyProps) {
  const { theme } = useTheme()

  useEffect(() => {
    document.body.className = `app ${theme}`
  }, [theme])

  return <>{children}</>
}