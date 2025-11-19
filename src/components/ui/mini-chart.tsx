import React from 'react'

interface MiniChartProps {
  data: number[]
  width?: number
  height?: number
  color?: string
  strokeWidth?: number
}

export const MiniChart: React.FC<MiniChartProps> = ({
  data,
  width = 120,
  height = 50,
  color = '#ef4444',
  strokeWidth = 2
}) => {
  if (!data || data.length < 2) {
    return (
      <div
        className="flex items-center justify-center bg-gray-800/30 rounded"
        style={{ width, height }}
      >
        <span className="text-gray-500 text-xs">No data</span>
      </div>
    )
  }

  const minValue = Math.min(...data)
  const maxValue = Math.max(...data)
  const range = maxValue - minValue

  // Generate SVG path
  const generatePath = () => {
    if (range === 0) {
      // If all values are the same, draw a horizontal line
      const y = height / 2
      return `M 0 ${y} L ${width} ${y}`
    }

    const stepX = width / (data.length - 1)

    let path = ''
    data.forEach((value, index) => {
      const x = index * stepX
      const y = height - ((value - minValue) / range) * height

      if (index === 0) {
        path += `M ${x} ${y}`
      } else {
        path += ` L ${x} ${y}`
      }
    })

    return path
  }

  const path = generatePath()
  const isPositive = data[data.length - 1] >= data[0]
  const chartColor = isPositive ? '#10b981' : '#ef4444'

  return (
    <div className="relative">
      <svg
        width={width}
        height={height}
        className="rounded"
        style={{ background: 'rgba(31, 41, 55, 0.3)' }}
      >
        {/* Background grid lines */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(156, 163, 175, 0.1)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Price line */}
        <path
          d={path}
          stroke={chartColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Gradient fill under the line */}
        <defs>
          <linearGradient id={`gradient-${Math.random()}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={chartColor} stopOpacity="0.3"/>
            <stop offset="100%" stopColor={chartColor} stopOpacity="0.0"/>
          </linearGradient>
        </defs>
        <path
          d={`${path} L ${width} ${height} L 0 ${height} Z`}
          fill={`url(#gradient-${Math.random()})`}
        />
      </svg>

    </div>
  )
}

export default MiniChart