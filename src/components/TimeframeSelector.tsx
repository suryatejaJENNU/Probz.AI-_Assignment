import React, { ChangeEvent } from 'react';
import './TimeframeSelector.css'; // Import CSS for styling

// Define props interface for TimeframeSelector component
interface TimeframeSelectorProps {
  onChange: (timeframe: string) => void; // Function to handle timeframe change
}

// TimeframeSelector component as a functional component
const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ onChange }) => {
  // Handler function for when timeframe selection changes
  const handleTimeframeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value); // Call onChange function with selected timeframe value
  };

  return (
    <div className="TimeframeSelector"> {/* Container div with CSS class */}
      <label>Select Timeframe:</label> {/* Label for the select dropdown */}
      <select onChange={handleTimeframeChange}> {/* Select dropdown */}
        <option value="daily">Daily</option> {/* Option for daily timeframe */}
        <option value="weekly">Weekly</option> {/* Option for weekly timeframe */}
        <option value="monthly">Monthly</option> {/* Option for monthly timeframe */}
      </select>
    </div>
  );
}

export default TimeframeSelector; // Export TimeframeSelector component
