import React, {useEffect, useState} from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import DoublyLinkedList from './DoublyLinkedList';
import './App.css';

// footnote/credits
const Footnote = () => {
  return (
    <div className="footnote-container">
      <span>this site was built using a data from <a href="https://soridata.com/">[this kpop database]</a></span>
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
      <span>lacking inspiration for your next kpop dance to learn? search no further! click the button below to get a random dance :)</span>
    </div>
  );
}


/** GENERATED VIDEO CONTENT **/
// fetching random dance
const fetchDance = async (groupType) => {
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
  
    console.log('Fetched data:', response.data);
    return response.data;

  } catch (err) {
    console.error('error fetching rand dance from csv file: ', err);
  }
};


// displaying info
const DanceTitle = ({ dvData }) => {
  return dvData ? (
    <div className="vid-title-container">
      <div className="vid-title">
        <h2>{dvData.original_name}</h2>
        </div>
      <div className="vid-artist">
        {dvData.group_name}
        </div>
    </div>
  ) : null;
}

// dance video
const DanceVid = ({ dvData }) => {
  return dvData ? (
    <div className="vid-player-container">
      <ReactPlayer url={`https://www.youtube.com/watch?v=${dvData.vlink}`} controls={true} />
      <VidInfo dvData={dvData} />
    </div>

  ) : null;
}

// video info
const VidInfo = ({ dvData }) => {
  return dvData ? (
    <div className="vid-info-container">
      <div className="group-type">Group Type: {dvData.members.charAt(0).toUpperCase() + dvData.members.slice(1)}</div>
      <div className="release-date">Release Date: {dvData.releasedate}</div>
      <div className="vid-link"><a href={`https://www.youtube.com/watch?v=${dvData.vlink}`} target="_blank" rel="noopener noreferrer">[open on youtube]</a></div>
    </div>
  ) : null;
}


// display vid
const DisplayDance = ({ dvData }) => {
  return (
    <div className="all-vid-info-container">
          <DanceTitle dvData={dvData} />
          <DanceVid dvData={dvData} />
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
    <button onClick={() => toggleTheme(theme, setTheme)} className="nav-button">Toggle Theme</button>
  );
}

// pagination buttons
const PrevBtn = ({ setDvData, dvHistory, setDvHistory }) => {
  const processPrev = () => {

    if (dvHistory.curr && dvHistory.curr.prev) {
      dvHistory.goBack();
      setDvData(dvHistory.curr ? dvHistory.curr.data : null);
      setDvHistory(dvHistory);

    } else {
      console.log("reached end of generated dances");
    }
  };

  return (
    <div className="prev-btn-container">
      <button onClick={processPrev} className="prev-btn">prev</button>
    </div>
  );
}

const NextBtn = ({ setDvData, dvHistory, setDvHistory }) => {
  const processNext = () => {

    if (dvHistory.curr && dvHistory.curr.next) {
      dvHistory.goNext();
      setDvData(dvHistory.curr ? dvHistory.curr.data : null);
      setDvHistory(dvHistory);

    } else {
      console.log("reached end of generated dances");
    }
  };

  return (
    <div className="next-btn-container">
      <button onClick={processNext} className="next-btn">next</button>
    </div>
  );
}

// rand dance generator button
const RandDanceBtn = ({ groupType, setDvData, numClicks, setNumClicks, dvHistory, setDvHistory }) => {
  const processClicks = async () => {
    // console.log("generating rand dance");

    const newDance = await fetchDance(groupType);
    
    // console.log("New Dance:", newDance);

    dvHistory.insertAtCurr(newDance);
    
    setDvData(newDance);
    setDvHistory(dvHistory);
    setNumClicks((prevClicks) => prevClicks + 1);
  };

  useEffect(() => {
    console.log("History after update:", dvHistory);
  }, [dvHistory]);

  return (
    <div className="start-btn-container">
      <button onClick={processClicks} className="start-btn">
        {numClicks === 0 ? 'get random dance' : 'give me another dance'}
      </button>
    </div>
  );
};

// nav bar
const NavBar = ({ groupType, setGroupType, theme, setTheme, setDvData, numClicks, setNumClicks, dvHistory, setDvHistory }) => {
  return (
    <div className="nav-bar-container">
      <div className="gender-filter-container">
        <GenderFilter groupType={groupType} setGroupType={setGroupType} />
      </div>
      <div className="pagination-container">
        {numClicks >= 2 && (
          <>
            <PrevBtn setDvData={setDvData} dvHistory={dvHistory} setDvHistory={setDvHistory} />
            <RandDanceBtn
            groupType={groupType}
            setDvData={setDvData}
            numClicks={numClicks}
            setNumClicks={setNumClicks}
            dvHistory={dvHistory}
            setDvHistory={setDvHistory}
            />
            <NextBtn setDvData={setDvData} dvHistory={dvHistory} setDvHistory={setDvHistory} />
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
  const [dvHistory, setDvHistory] = useState(new DoublyLinkedList());

  useEffect(() => {
    console.log('State Updated:', dvData);
  }, [dvData]);


  return (
    <div className={`App ${theme}`}>
      <div className="site-body-container">
        <Footnote />
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
      </div>

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
      />
      
    </div>
  );
}

export default App;
