import React, { useState } from 'react';

function Rating(props) {
  const [value, setValue] = useState(props.stars);
  const [dynamicValue, setDynamicValue] = useState(props.stars);

  const starSpans = [];

  for (let v = 1; v <= 5; v++) {
    starSpans.push(
      <span
        key={v}
        style={{
          fontSize: "2em",
          color: "#AED57D",
        }}
      >
        {v <= dynamicValue ? '★' : '☆'}
      </span>
    );
  }

  return <div>{starSpans}</div>;
}

export default Rating;