import React,{useState, useEffect} from 'react';
import './Planet.css';

function PlanetCard({ planet }){ 
    const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = async () => {
      const promises = planet.residents.map(async residentUrl => {
        const response = await fetch(residentUrl);
        const data = await response.json();
        return data;
      });
      const residentsData = await Promise.all(promises);
      setResidents(residentsData);
    };

    fetchResidents();
  }, [planet.residents]);
    return(
        <div className="planet-card">
            <h2>{planet.name}</h2>
            <p><strong>Climate:</strong> {planet.climate}</p>
            <p><strong>Population:</strong> {planet.population}</p>
            <h3>Residents:</h3>
            <ul>
                {residents.map(resident => (
                <li key={resident.name}>
                    <strong>Name:</strong> {resident.name},<br/> <strong>Height:</strong> {resident.height},{' '}
                    <strong>Mass:</strong> {resident.mass}, <strong>Gender:</strong> {resident.gender}
                </li>
                ))}
            </ul>
    </div>
    )
}
export default PlanetCard;
