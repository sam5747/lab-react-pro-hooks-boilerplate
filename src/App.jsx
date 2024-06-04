import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./App.css";

// Do not change this
const LARGE_NUMBER = 1000000000;

function App() {
  const [value, setValue] = useState(0);
  const [dark, setTheme] = useState(true);
  const [themeName, setThemeName] = useState("dark");
  const [currentList, setList] = useState([]);

  // Memoize delayFunction to prevent it from running on every render
  const delayFunction = useMemo(() => {
    console.log("Delay Function Ran");
    for (let index = 0; index < LARGE_NUMBER; index++) {}
    return value + 2;
  }, [value]);

  // Memoize testFunction to prevent it from being recreated on every render
  const testFunction = useCallback(() => {
    return [value * 3, value * 4];
  }, [value]);

  // Update useEffect to only run when testFunction changes
  useEffect(() => {
    console.log("Callback Function was called");
  }, [testFunction]);

  // Update useEffect to handle theme changes
  useEffect(() => {
    setThemeName(dark ? "dark" : "light");
  }, [dark]);

  const handleClick = () => {
    setTheme(!dark);
  };

  const handleChangeValue = () => {
    setValue(value + 1);
  };

  const handleList = () => {
    setList(testFunction());
  };

  const styleTheme = {
    backgroundColor: dark ? "black" : "#ccc7c7",
  };

  return (
    <div className="page" style={styleTheme}>
      <button onClick={handleClick}>{themeName}</button>
      <h1>{value}</h1>
      <button onClick={handleChangeValue}>Change Value</button>
      <button onClick={handleList}>Show List</button>
      <h2>{delayFunction}</h2>
      <div>
        {currentList.map((item, index) => (
          <h2 key={index}>{item}</h2>
        ))}
      </div>
    </div>
  );
}

export default App;
