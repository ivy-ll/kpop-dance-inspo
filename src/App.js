import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
import axios from 'axios'

// footnote/credits

/** HOME PAGE CONTENT **/
// intro title

// intro blurb


/** GENERATED VIDEO CONTENT **/
// song info

// dance video

// overlay ??

// song link


/** NAV BAR CONTENT **/
// nav bar


// gender filter


// light/dark mode


// pagination buttons


// main page/function
function App() {
  const [groupType, setGroupType] = useState('all');
  const [dvData, setDvData] = useState(null);


  const fetchDance = async () => {
    try {
      let route = '';

      if (groupType === 'gg') {
        route = 'api/getRandDanceGG';

      } else if (groupType === 'bg') {
        route = 'api/getRandDanceBG';
        
      } else {
        route = 'api/getRandDanceAll';
      }

      const response = await axios.get(route);
      setDvData(response.data);
    
      console.log('Fetched data:', response.data);

    } catch (err) {
      console.error('error fetching rand dance from csv file: ', err);
    }
  };

  useEffect(() => {
    console.log(' State Updated:', dvData);
  }, [dvData]);


  return (
    <div>
        <h1>Random Kpop Dance Vid Generator</h1>
      
      {/* Slider or Dropdown */}
      <label>
        Select Dance Type:
        <select
          value={groupType}
          onChange={(e) => setGroupType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="gg">Girl Group</option>
          <option value="bg">Boy Group</option>
        </select>
      </label>

      {/* Button to fetch dance */}
      <button onClick={fetchDance}>Get Random Dance</button>

      {/* Display the dance info */}
      {dvData && (
        <div>
          <h2>Random Dance</h2>
          <p>Song Title: {dvData.original_name}</p>
          <p>Video Link: <a href={`https://www.youtube.com/watch?v=${dvData.vlink}`} target="_blank" rel="noopener noreferrer">Watch Video</a></p>
          <p>Release Date: {dvData.releasedate}</p>
          <p>Group Name: {dvData.group_name}</p>
          <p>Group Type: {dvData.members.charAt(0).toUpperCase() + dvData.members.slice(1)}</p>
          {console.log('Rendering dvData:', dvData)} {/* Debugging line */}
        </div>
      )}
      </div>
  );
}

export default App;
