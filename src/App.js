import React, {useEffect, useState} from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import './App.css';

// footnote/credits
const Footnote = () => {
  return (
    <div className="footnote-container">
      <span>this site was built using a data from <a href="https://soridata.com/">this kpop database</a></span>
    </div>
  )
}

/** HOME PAGE CONTENT **/
// intro title
const IntroHeader = () => {
  return (
    <div className="intro-header-container">
      <h1>Kpop Dance Video Suggester</h1>
    </div>
  );
}

// intro description
const IntroDesc = () => {
  return (
    <div className="intro-desc-container">
      <span>feeling stuck and lackign inspiration for your next kpop dance to learn? search no further! click the button below to get a random dance :)</span>
    </div>
  );
}


/** GENERATED VIDEO CONTENT **/
// fetching random dance
const fetchDance = async (groupType, setDvData) => {
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


// displaying info
const DanceTitle = ({ dvData }) => {
  return dvData ? (
    <div className="vid-title-container">
      <span>{dvData.original_name}</span>
      <span>{dvData.group_name}</span>
    </div>
  ) : null;
}

// dance video
const DanceVid = ({ dvData }) => {
  return dvData ? (
    <div className="vid-player-container">
      <ReactPlayer url={`https://www.youtube.com/watch?v=${dvData.vlink}`} controls={true} />
    </div>
  ) : null;
}

// video overlay (hover)
const VidOverlay = ({ dvData }) => {
  return dvData ? (
    <div className="vid-overlay-container">
      <span>Group Type: {dvData.members.charAt(0).toUpperCase() + dvData.members.slice(1)}</span>
      <span>Release Date: {dvData.releasedate}</span>
    </div>
  ) : null;
}

// song link
const DanceLink = ({ dvData }) => {
  return dvData ? (
    <div className="vid-link-container">
      <span>
        <a href={`https://www.youtube.com/watch?v=${dvData.vlink}`} target="_blank" rel="noopener noreferrer">open on youtube</a>
      </span>
    </div>
  ) : null;
}

// display vid
const DisplayDance = ({ dvData }) => {
  return (
    <div className="all-vid-info-container">
          <DanceTitle dvData={dvData} />
          <DanceVid dvData={dvData} />
          <VidOverlay dvData={dvData} />
          <DanceLink dvData={dvData} />
    </div>
  )
}

/** NAV BAR CONTENT **/
// gender filter
const GenderFilter = ({ groupType, setGroupType }) => {
  return (
  <select value={groupType} onChange={(e) => setGroupType(e.target.value)} className="nav-dropdown">
    <option value="all">All</option>
    <option value="gg">Girl Group</option>
    <option value="bg">Boy Group</option>
  </select>
  );
}

// light/dark mode
const toggleTheme = (theme, setTheme) => {
  setTheme(theme === 'light' ? 'dark' : 'light');
}

const ThemeBtn = ({ theme, setTheme }) => {
  return (
    <div className="theme-btn-container">
      <button onClick={() => toggleTheme(theme, setTheme)} className="nav-button">Toggle Theme</button>
    </div>
  );
}

// pagination buttons
const PrevBtn = ({ dvHistory, setDvData, currIndex, setCurrIndex }) => {
  const processPrev = () => {
    if (currIndex > 0) {
      const prevDance = dvHistory[currIndex - 1];
      setDvData(prevDance);
      setCurrIndex((prevIndex) => prevIndex - 1);

      console.log(currIndex);
    }
  };

  return (
    <div className="prev-btn-container">
      <button onClick={processPrev} className="prev-btn">prev</button>
    </div>
  );
}

const NextBtn = ({ setDvData, dvHistory, currIndex, setCurrIndex }) => {
  const processNext = () => {
    if (currIndex < dvHistory.length - 1) {
      const nextDance = dvHistory[currIndex + 1];
      setDvData(nextDance);
      setCurrIndex((prevIndex) => prevIndex + 1);

      console.log(currIndex);
    }
  };

  return (
    <div className="next-btn-container">
      <button onClick={processNext} className="next-btn">next</button>
    </div>
  );
}

const RandDanceBtn = ({ groupType, setDvData, numClicks, setNumClicks, dvHistory, setDvHistory, currIndex, setCurrIndex }) => {
  const processClicks = () => {
    fetchDance (groupType, (newDance) => {
      setDvData(newDance);

      if (numClicks === 0) {
        setDvHistory([newDance]);
        setCurrIndex(0);
    
      } else { 
        // inserting new dances at place in array if user is not at end of generated dances
        const newHist = [...dvHistory.slice(0, currIndex + 1), newDance];
        setDvHistory(newHist);
        setCurrIndex(currIndex + 1);
      }
    });

    setNumClicks(numClicks + 1);
  };

  return (
    <div className="start-btn-container">
      <button onClick={processClicks} className="start-btn">
        {numClicks === 0 ? 'get random dance' : 'give me another dance'}
      </button>
    </div>
  );
}

// nav bar
const NavBar = ({ groupType, setGroupType, theme, setTheme, setDvData, numClicks, setNumClicks, dvHistory, setDvHistory, currIndex, setCurrIndex }) => {
  return (
    <div className="nav-bar-container">
      <div className="gender-filter-container">
        <GenderFilter groupType={groupType} setGroupType={setGroupType} />
      </div>
      <div className="paginination-container">
        {numClicks >= 2 && (
          <>
            <PrevBtn setDvData={setDvData} dvHistory={dvHistory} currIndex={currIndex} setCurrIndex={setCurrIndex} />
            <RandDanceBtn
            groupType={groupType}
            setDvData={setDvData}
            numClicks={numClicks}
            setNumClicks={setNumClicks}
            dvHistory={dvHistory}
            setDvHistory={setDvHistory}
            currIndex={setCurrIndex}
            setCurrIndex={setCurrIndex}
            />
            <NextBtn setDvData={setDvData} dvHistory={dvHistory} currIndex={currIndex} setCurrIndex={setCurrIndex} />
          </>
        )}
        {numClicks < 2 && (
          <RandDanceBtn
            groupType={groupType}
            setDvData={setDvData}
            numClicks={numClicks}
            setNumClicks={setNumClicks}
            dvHistory={dvHistory}
            setDvHistory={setDvHistory}
            currIndex={setCurrIndex}
            setCurrIndex={setCurrIndex}
          />
        )}
      </div>
      <div className="toggle-theme-container">
        <ThemeBtn theme={theme} setTheme={setTheme} />
      </div> 
    </div>
  );
}



/** MAIN APP **/
function App() {
  const [groupType, setGroupType] = useState('all');
  const [dvData, setDvData] = useState(null);
  const [theme, setTheme] = useState('light');
  const [numClicks, setNumClicks] = useState(0);
  const [dvHistory, setDvHistory] = useState([]);
  const [currIndex, setCurrIndex] = useState(-1);

  useEffect(() => {
    console.log('State Updated:', dvData);
  }, [dvData]);


  return (
    <div className={`App ${theme}`}>
      {/* displaying intro section on webpage load (start button not clicked)*/}
      {numClicks === 0 && (
        <>
          <IntroHeader />
          <IntroDesc />
        </>
      )}

      {/* displaying video info once start button clicked*/}
      {numClicks > 0 && (
        <>
          <DisplayDance dvData={dvData} />
        </>
      )}

      <NavBar
        groupType={groupType}
        setGroupType={setGroupType}
        theme={theme}
        setTheme={setTheme}
        fetchDance={fetchDance}
        setDvData={setDvData}
        numClicks={numClicks}
        setNumClicks={setNumClicks}
        dvHistory={dvHistory}
        setDvHistory={setDvHistory}
        currIndex={currIndex}
        setCurrIndex={setCurrIndex}
      />
      <Footnote />
    </div>
  );
}

export default App;
