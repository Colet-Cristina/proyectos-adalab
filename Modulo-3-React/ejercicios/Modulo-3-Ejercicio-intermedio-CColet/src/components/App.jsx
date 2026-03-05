import { useState } from "react";
import Header from "./layaut/header";

import "../styles/App.scss";

import countriesData from "../data/countries.json";

function App() {
  //DATOS
  const [allCountries, setAllCountries] = useState(countriesData);

  //DATOS: filtros
  const [filterName, setFilterName] = useState("");

  //FUNCIONES MANEJADORAS
  const handleImputFilterName = (ev) => {
    setFilterName(ev.target.value);
  };
  // VARIABLES PARA PINTAR LA PAGINA
  const filteredCountries = allCountries.filter(
    (eachCantry) =>
      // ¡USAR ESTA VALIDACIÓN!
      eachCantry && eachCantry.common.toLocaleLowerCase().includes("c")
  );

  {
    /* ---------------------------  ---------------------------*/
  }
  return (
    <div>
      {/* ---------------------- header ---------------------------*/}
      <Header />

      {/* --------------------------- main ---------------------------*/}
      <main className="main">
        <div className="container">
          <div className="filters">
            {/* --------------------------- Country  ---------------------------*/}
            <div className="filter-group">
              <label htmlFor="filterByCountry">Country</label>
              <input type="text" id="filterByCountry" placeholder="Spain" />
            </div>
            {/* --------------------------- opciones de filtrado ---------------------------*/}
            <div className="filter_group">
              <label htmlFor="filterByContinent">Continent</label>
              <select id="filterByContinent">
                <option value="All">All</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="North America">America</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>
          </div>
          {/* --------------------------- Capital ---------------------------*/}
          <div className="add_country">
            <div className="add_country_group">
              <label htmlFor="capital">Capital</label>
              <input
                type="text"
                id="capital"
                placeholder="Spain"
                onInput={handleImputFilterName}
              />
            </div>
            {/* --------------------------- Continent ---------------------------*/}
            <div className="add_country_group">
              <label htmlFor="continent">Continent</label>
              <input type="text" id="continent" placeholder="Continent" />
            </div>
            <button>Add Country</button>
          </div>

          {/* --------------------------- lista-paises ---------------------------*/}
          <ul className="country_list">
            {filteredCountries.map((eachCountry) => (
              <li key={eachCountry.id} className="country_card">
                <button className="close_btn">X</button>
                <img
                  className="flag_icon"
                  src={eachCountry.flag}
                  alt="Bandera de España"
                />
                <h3>{eachCountry.common}</h3>
                <p>{eachCountry.officialName}</p>
                <p>{eachCountry.capital}</p>
                <p>{eachCountry.continent}</p>
                <p>{eachCountry.Language}</p>
                <p>{eachCountry.currency}</p>
              </li>
            ))}

            {/* ---------------------------  ---------------------------*/}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
