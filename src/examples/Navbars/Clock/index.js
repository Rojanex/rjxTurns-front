import React, { useState, useEffect } from "react";
import MDTypography from "components/MDTypography";

function Clock(light) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <MDTypography variant="h1" fontWeight="medium" color="white" mt={2} mb={1} style={{ fontSize: '4rem' }}>
      {time.toLocaleTimeString()}
    </MDTypography>
  );
}

export default Clock;
