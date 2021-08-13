import React from 'react';
import './ChartBar.css';

const ChartBar = (props) => {
  // This will be assigned as a CSS style, so use text
  let barFillHeight = '0%';

  if (props.maxValue > 0) {
    // Gives us percentage from 0-100 representing this bar's height
    barFillHeight = Math.round((props.value / props.maxValue) * 100) + '%';
  }
  return (
    <div className='chart-bar'>
      <div className='chart-bar__inner'>
        <div
          className='chart-bar__fill'
          style={{ height: barFillHeight }}
        ></div>
      </div>{' '}
      <div className='chart-bar__label'>{props.label}</div>
    </div>
  );
};

export default ChartBar;
