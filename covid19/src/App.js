import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InfoBox from "./infoBox";
import Map from "./Map";
import "./App.scss";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");

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

  const onCountryChange = async (event) => {
    setCountry(event.target.value);
    const url =
      country === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${country}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        setCountries(countries);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Lets build a COVID TRACKER</h1>
          <FormControl className="app__dropdow">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map((country1) => (
                <MenuItem key={uuidv4()} value={country1.value}>
                  {country1.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title="Corona virus case" cases={100} total={3034} />
          <InfoBox title="Recovered" cases={90} total={6034} />
          <InfoBox title="Deaths" cases={1} total={304} />
        </div>
        {/* HEADER */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by County</h3>
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
