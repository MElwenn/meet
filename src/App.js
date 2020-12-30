import React, { Component } from 'react';
import './App.css';
import "./nprogress.css";

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { InfoAlert } from './Alert';
import { ErrorAlert } from './Alert'
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import EventGenre from './EventGenre';

class App extends Component {
  state = {
    events: [],
    locations: [],
    nbrOfEvents: 32,
    selectedLocation: 'all',
    infoText: '',
  };

  updateEvents = (location, nbrOfEvents = this.state.nbrOfEvents) => {
    getEvents().then((response) => {
      const { events, locations } = response
      const locationEvents = (location === 'all' || !location) ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents.slice(0, nbrOfEvents),
        nbrOfEvents
      });
    });
  }

  getData = () => {
    const { locations, events } = this.state;
    const gridData = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(' ').shift()
      return { city, number };
    })
    return gridData;
  };

  filterEvents = () => {
    const { locations, events } = this.state;
    const result = locations.map((location) => {
      const amountEvents = events.filter((event) => event.location === location).length;
      const city = location.split(',').shift();
      return { amountEvents, city };
    })
    return result;
  }

  async componentDidMount() {
    this.mounted = true;

    if (!navigator.onLine) {
      this.setState({
        infoText: 'No internet connenction found. Tha data shown is loaded from the cash.'
      });
    }

    await getEvents().then((response) => {
      if (this.mounted) {
        this.setState({ events: response.events, locations: response.locations });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { locations, numberOfEvents, events } = this.state;
    //const { summary } = this.state;
    return (
      <div className="App">
        <h1>What's up next ...? </h1>
        <h2>Choose your City</h2>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <InfoAlert className="info-text" text={this.state.infoText} />
        <NumberOfEvents nbrOfEvents={this.state.nbrOfEvents} updateEvents={this.updateEvents} />
        <ErrorAlert text={this.state.errMessage} />
        <div className="data-vis-wrapper">
          <h4>Events in each city</h4>
          <ResponsiveContainer height={400} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
          <h4>Popularity of Genres</h4>
          <EventGenre events={this.state.events} />
        </div>
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
