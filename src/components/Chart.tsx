import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Chart.css'; // Import CSS for styling
import TimeframeSelector from './TimeframeSelector'; // Import TimeframeSelector component
import html2canvas from 'html2canvas'; // Import html2canvas library for exporting chart as PNG

interface DataPoint {
  timestamp: string;
  value: number;
}

const Chart: React.FC = () => {
  // State hooks to manage data and selected timeframe
  const [originalData, setOriginalData] = useState<DataPoint[]>([]);
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('daily'); // Default to daily

  const chartRef = useRef<any>(null); // Ref to hold reference to LineChart component

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/assets/data.json'); // Fetch data from JSON file
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json(); // Parse JSON data
        setOriginalData(jsonData); // Store original data
        setChartData(jsonData); // Initialize chartData with original data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call fetchData function on component mount
  }, []);

  // Handler function for timeframe change
  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe); // Update selected timeframe
    updateChartData(timeframe); // Update chart data based on selected timeframe
  };

  // Function to update chart data based on selected timeframe
  const updateChartData = (timeframe: string) => {
    let filteredData: DataPoint[] = [];

    switch (timeframe) {
      case 'daily':
        filteredData = originalData; // Display original data
        break;
      case 'weekly':
        filteredData = getWeeklyData(originalData); // Get weekly aggregated data
        break;
      case 'monthly':
        filteredData = getMonthlyData(originalData); // Get monthly aggregated data
        break;
      default:
        filteredData = originalData; // Default to original data
        break;
    }

    setChartData(filteredData); // Update chart data based on selected timeframe
  };

  // Function to calculate weekly aggregated data
  const getWeeklyData = (data: DataPoint[]): DataPoint[] => {
    const weeklyData: DataPoint[] = [];
    const weekMap = new Map<number, number[]>();

    data.forEach((point) => {
      const timestamp = new Date(point.timestamp);
      const weekNumber = getWeekNumber(timestamp);

      if (!weekMap.has(weekNumber)) {
        weekMap.set(weekNumber, []);
      }
      weekMap.get(weekNumber)?.push(point.value);
    });

    weekMap.forEach((weekData, weekNumber) => {
      const sum = weekData.reduce((acc, curr) => acc + curr, 0);
      const average = sum / weekData.length;
      weeklyData.push({ timestamp: `Week ${weekNumber}`, value: average });
    });

    return weeklyData;
  };

  // Function to calculate monthly aggregated data
  const getMonthlyData = (data: DataPoint[]): DataPoint[] => {
    const monthlyData: DataPoint[] = [];
    const monthMap = new Map<number, number[]>();

    data.forEach((point) => {
      const timestamp = new Date(point.timestamp);
      const monthNumber = timestamp.getMonth();

      if (!monthMap.has(monthNumber)) {
        monthMap.set(monthNumber, []);
      }
      monthMap.get(monthNumber)?.push(point.value);
    });

    monthMap.forEach((monthData, monthNumber) => {
      const sum = monthData.reduce((acc, curr) => acc + curr, 0);
      const average = sum / monthData.length;
      monthlyData.push({ timestamp: `Month ${monthNumber + 1}`, value: average });
    });

    return monthlyData;
  };

  // Function to get the week number of a date
  const getWeekNumber = (date: Date): number => {
    const onejan = new Date(date.getFullYear(), 0, 1);
    return Math.ceil(((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
  };

  // Function to export chart as PNG
  const exportChart = () => {
    // Check if chartRef.current and chartRef.current.container exist
    if (chartRef.current && chartRef.current.container) {
      const chartContainer = chartRef.current.container as HTMLElement;

      // Delay to ensure chart rendering is complete before capturing
      setTimeout(() => {
        html2canvas(chartContainer).then((canvas) => {
          const link = document.createElement('a');
          link.download = 'chart.png'; // Set filename for downloaded image
          link.href = canvas.toDataURL(); // Set href to data URL of canvas image
          link.click(); // Simulate click to trigger download
        });
      }, 500); // Adjust delay as needed
    }
  };

  return (
    <div className="Chart-container">
      <h2>Charting Application</h2>
      <TimeframeSelector onChange={handleTimeframeChange} /> {/* Render TimeframeSelector component */}
      <ResponsiveContainer width="90%" height={400}>
        <LineChart ref={chartRef} data={chartData}> {/* LineChart component with ref */}
          <CartesianGrid strokeDasharray="3 3" /> {/* Cartesian grid for the chart */}
          <XAxis dataKey="timestamp" /> {/* X-axis displaying timestamps */}
          <YAxis /> {/* Y-axis for values */}
          <Tooltip /> {/* Tooltip for displaying data */}
          <Legend /> {/* Legend for the chart */}
          <Line type="monotone" dataKey="value" stroke="#8884d8" /> {/* Line series for chart */}
        </LineChart>
      </ResponsiveContainer>
      <button onClick={exportChart}>Export Chart</button> {/* Button to export chart */}
    </div>
  );
};

export default Chart; // Export Chart component
