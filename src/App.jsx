import React, { useState, useEffect } from 'react';
import audioFile from "./Assets/Stopwatch.mp3"; // Import your audio file

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTimes, setLapTimes] = useState([]);
  const [lapStartTime, setLapStartTime] = useState(0);

  // Audio element reference
  let audioRef = null;

  useEffect(() => {
    let timerID;

    if (isRunning) {
      timerID = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 10);
    }

    return () => {
      clearInterval(timerID);
    };
  }, [isRunning]);

  useEffect(() => {
    // Play or pause audio based on isRunning state
    if (audioRef) {
      if (isRunning) {
        audioRef.play();
      } else {
        audioRef.pause();
      }
    }
  }, [isRunning]);
  const formatTime = milliseconds => {
    const totalSeconds = Math.floor(milliseconds / 100);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const millisecondsFormatted = Math.floor(milliseconds % 100).toString().padStart(2, '0');

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${millisecondsFormatted}`;
  };

  const handleStartPause = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);

    if (!isRunning) {
      setLapStartTime(Date.now());
    } 
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLapTimes([]);
  };

  const handleLap = () => {   
    const lapTime = Date.now() - lapStartTime;
    const formattedLapTime = formatTime(lapTime);
    const splitTime = formatTime(time);
    setLapTimes(prevLapTimes => [...prevLapTimes, { lap: prevLapTimes.length + 1, lapTime: formattedLapTime, splitTime }]);
  };


  return (
    <div className="stopwatch-container">
      <h2>Stop Watch </h2>
    <h1>{formatTime(time)}</h1>
    <button onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</button>
    <button onClick={handleReset}>Reset</button>
    <button onClick={handleLap}>Lap</button>
    <audio ref={audio => (audioRef = audio)} src={audioFile} loop />
    <div className="lap-times">
      <table>
        <thead>
          <tr>
            <th>Lap</th>
            <th>Lap Time</th>
            <th>Split Time</th>
          </tr>
        </thead>
        <tbody>
          {lapTimes.map((lap, index) => (
            <tr key={index}>
              <td>{lap.lap}</td>
              <td>{lap.lapTime}</td>
              <td>{lap.splitTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
            <footer>
              <p>&copy; {new Date().getFullYear()} SPRHackz</p>
            </footer>
  </div>
  );

};

export default App;
