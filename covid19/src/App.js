import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("select");
  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountries();
  }, []);

  const countryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div className="App">
      <h1>Lets build a COVID TRACKER</h1>
      <FormControl>
        <Select variant="outlined" value={country} onChange={countryChange}>
          <MenuItem value="select">Select country</MenuItem>
          {countries.map((country1) => (
            <MenuItem key={uuidv4()} value={country1.value}>
              {country1.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* HEADER */}
    </div>
  );
}

export default App;
