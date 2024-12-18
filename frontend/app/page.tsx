"use client";

import React from "react";
import Button from "../components/Button";

export default function Home() {
  const handleButtonClick = () => {
    alert("Button Clicked!");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Test Button Component</h1>
      <Button label="Click Me" onClick={handleButtonClick} />
    </div>
  );
}
