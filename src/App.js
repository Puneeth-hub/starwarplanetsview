import React, {useState,useEffect} from 'react'; 
import PlanetCard from './Planetcard/Planet';
import './App.css';

function App() { 
  const [planets, setPlanets] = useState([]); 
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [prevPageUrl, setPrevPageUrl] = useState('');
  useEffect(()=>{
     const fetchPlanets = async() => {
        const response = await fetch('https://swapi.dev/api/planets/?format=json'); 
        const data = await response.json(); 
        console.log('data', data);
        setPlanets(data.results)
        setNextPageUrl(data.next);
     }
     fetchPlanets()
  },[])  

  const fetchNextPage = async()=>{
     if(nextPageUrl) {
      const response = await fetch(nextPageUrl) 
      const data = await response.json(); 
      setPlanets(data.results);
      setNextPageUrl(data.next); 
      setPrevPageUrl(data.previous); 
     }
  }
  const fetchPrevPage= async()=>{
    if(prevPageUrl){
      const response = await fetch(prevPageUrl);
      const data = await response.json(); 
      setPlanets(data.results);
      setNextPageUrl(data.next);
      setPrevPageUrl(data.previous);
    }
  }

  return (
    <div className='App'>
        <h1 className='App-header'>Star Wars Planets</h1> 
        <div className="planet-container">
        {planets.map(planet => (
          <PlanetCard key={planet.name} planet={planet} />
        ))}  
      <div className="pagination">
        {prevPageUrl &&<button className="page-btn" onClick={fetchPrevPage}>prev</button>}
        {nextPageUrl &&<button className="page-btn" onClick={fetchNextPage}>next</button>}
      </div>
      </div>
    </div>
  );
}

export default App;
