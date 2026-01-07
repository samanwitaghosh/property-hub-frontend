//import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from "react";
import { fetchProperties } from "./services/githubService";
import PropertyList from "./components/PropertyList";


function App() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function getProperties() {
      const data = await fetchProperties();
      setProperties(data);
    }
    getProperties();
  }, []);

  return (
    <div className="App">
      <h1>Property Listings</h1>

      {/* Grid container wrapping PropertyList */}
      <div className="property-list-container">
        <PropertyList properties={properties} />
      </div>
    </div>
  );
}

export default App;




