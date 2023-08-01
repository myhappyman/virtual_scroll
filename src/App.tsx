import { useState, useEffect } from 'react';
import Order from './components/pages/Order/Order';
import Picture from './components/pages/Picture/Picture';
import PerformanceTest1 from './components/pages/PerformanceTest/PerformanceTest1';
import PerformanceTest2 from './components/pages/PerformanceTest/PerformanceTest2';

import './App.scss';

function App() {
  const [message, setMessage] = useState('');
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data.slice(0, 1500));
      });
  }, [setPhotos]);
  return (
    <div>
      {/* <Picture /> */}
      {/* <Order /> */}
      <input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <div className="photos">
        <PerformanceTest1 photos={photos} message={message} />
        <PerformanceTest2 photos={photos} message={message} />
      </div>
    </div>
  );
}

export default App;
