// Example usage of the matrixToClockwiseString function

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { matrixToClockwiseString } from "./utils";

function App() {
  const [matrixWidth, setMatrixWidth] = useState<number>(3);
  const [matrixHeight, setMatrixHeight] = useState<number>(3);
  const [matrixToString, setMatrixToString] = useState<string>("");
  const [visited, setVisited] = useState<boolean[][]>([]);

  function handleClick(): void {
    // fill matrix from 1 to matrixWidth * matrixHeight
    const matrix = Array.from({ length: matrixHeight }, (_, i) => {
      return Array.from({ length: matrixWidth }, (_, j) => {
        return i * matrixWidth + j + 1;
      });
    });
    const { matrixString, visited } = matrixToClockwiseString(matrix);
    setMatrixToString(matrixString);
    setVisited(visited);
  }

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Sample React App</h1>
      <div className="card">
        <h2>Matrix to Clockwise String</h2>
        <p>
          Enter the matrix width and height and click the button to generate a
          clockwise string
        </p>
        <p>
          <label>
            Width:<br />
            <input
              type="number"
              value={matrixWidth}
              defaultValue={matrixWidth}
              onChange={(e) => setMatrixWidth(parseInt(e.target.value))}
            />
          </label>
        </p>
        <p>
          <label>
            Height:<br />
            <input
              type="number"
              value={matrixHeight}
              defaultValue={matrixHeight}
              onChange={(e) => setMatrixHeight(parseInt(e.target.value))}
            />
          </label>
        </p>
        <button onClick={handleClick}>Run Matrix</button>
        {matrixToString ? (
          <div >
            <h3>Matrix to String</h3>
            <p>{matrixToString}</p>
            <h3>Visited</h3>
            <table style={{ margin: '2rem auto' }}>
              <tbody>
                {visited.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        style={{
                          backgroundColor: cell ? "lightgreen" : "lightgray",
                          padding: "0.5rem 0.75rem",
                        }}
                      >
                        {cell ? "T" : "F"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
