import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

interface HistoricalData {
  prices?: [number, number][];
}

interface LineChartProps {
  historicalData: HistoricalData;
}

const LineChart: React.FC<LineChartProps> = ({ historicalData }) => {
  const [data, setData] = useState<(string | number)[][]>([["Date", "Prices"]])

  useEffect(() => {
    let dataCopy: (string | number)[][] = [["Date", "Prices"]]
    if (historicalData.prices) {
      historicalData.prices.map((item) => {
        dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0, -5)}`, item[1]])
      })
      setData(dataCopy);
    }
  }, [historicalData])

  return (
    <Chart
      chartType='LineChart'
      data={data}
      height="100%"
      legendToggle
    />
  )
}

export default LineChart