import React, { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col,
  Jumbotron,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  FormGroup
} from "reactstrap";
import Weather from "./Weather";

const App = () => {
  const [values, setValues] = useState({
    weather: "",
    cityList: [],
    newCityName: ""
  });

  const { weather, cityList, newCityName } = values;
  const [error, setError] = useState("");

  const getCityList = () => {
    fetch("/api/cities")
      .then(res => res.json())
      .then(res => {
        let cityList = res.map(r => r.city_name);
        setValues({ ...values, cityList });
      });
  };

  const onChange = e => {
    setValues({
      ...values,
      newCityName: e.target.value
    });
  };

  const getWeather = city => {
    fetch(`/api/weather/${city}`)
      .then(res => res.json())
      .then(weather => {
        setValues({ ...values, weather });
      });
  };

  const ChangeCity = e => {
    getWeather(e.target.value);
  };

  const AddCity = () => {
    fetch("/api/cities", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: newCityName })
    })
      .then(res => res.json())
      .then(data => {
        if (data.err) {
          setError(data.err);
        } else {
          getCityList();
        }
      });
  };

  useEffect(() => {
    getCityList();
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid className="centered">
      <Navbar dark color="dark">
        <NavbarBrand href="/">MyWeather</NavbarBrand>
      </Navbar>
      <Row>
        <Col>
          <Jumbotron>
            <h1 className="display-3">MyWeather</h1>
            {error && <h1 style={{ color: "#FF0000" }}>{error}</h1>}
            <p className="lead">
              The current weather for your favorite cities!
            </p>
            <InputGroup>
              <Input
                type="text"
                name="newCityName"
                placeholder="New city name..."
                value={newCityName}
                onChange={onChange}
              />
              <InputGroupAddon addonType="append">
                <Button color="primary" onClick={AddCity}>
                  Add City
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="display-5">Current Weather</h1>
          <FormGroup>
            <Input type="select" onChange={ChangeCity}>
              {cityList.length === 0 && <option>No cities added yet.</option>}
              {cityList.length > 0 && <option>Select a city.</option>}
              {cityList.map((city, i) => (
                <option key={i}>{city}</option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Weather data={weather} />
    </Container>
  );
};

export default App;
