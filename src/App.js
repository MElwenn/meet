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
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

class App extends Component {
  state = {
    events: [],
    locations: [],
    NumberOfEvents: 32,
    selectedLocation: 'all',
    infoText: ''
  };

  //filter the results based on location
  updateEvents = (location, eventCount) => {
    const { selectedLocation, nbrOfEvents } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents = (location === 'all') ?
          events : events.filter((event) => event.location === location);
        const filteredEvents = locationEvents.slice(0, nbrOfEvents);
        this.setState({
          events: filteredEvents,
          selectedLocation: location
        });
      });
    }
    else {
      getEvents().then((events) => {
        const locationEvents = (selectedLocation === 'all') ?
          events : events.filter((event) => event.location === selectedLocation);
        const filteredEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: filteredEvents,
          nbrOfEvents: eventCount
        });
      });
    }
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(' ').shift()
      return { city, number };
    })
    return data;
  };

  /*updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
      events : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }*/

  filterEvents = () => {
    const { locations, events } = this.state;
    const result = locations.map((location) => {
      const amountEvents = events.filter((event) => event.location === location).length;
      const city = location.split(',').shift();
      return { amountEvents, city };
    })
    return result;
  }

  componentDidMount() {
    this.mounted = true;

    if (!navigator.onLine) {
      this.setState({
        infoText: 'No internet connenction found. Tha data shown is loaded from the cash.'
      });
    }

    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { locations, numberOfEvents } = this.state;
    return (
      <div className="App">
        <h1>What's up next ...? </h1>
        <h2>Choose your City</h2>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <InfoAlert className="info-text" text={this.state.infoText} />
        <NumberOfEvents nbrOfEvents={this.state.result} updateEvents={this.updateEvents} />
        <ErrorAlert text={this.state.errMessage} />
        <h4>Events in each city</h4>
        <ScatterChart width={800} height={250}
          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="category" dataKey="city" name="city" />
          <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />

          <Tooltip cursor={{ strokeDasharray: '3 3' }} />

          <Scatter data={this.getData()} fill="#8884d8" />

        </ScatterChart>
        <EventList events={this.state.events} />
      </div>
    );
    //<NumberOfEvents nbrOfEvents={this.state.nbrOfEvents} updateEvents={this.updateEvents} />
    //<NumberOfEvents nbrOfEvents={this.state.result} updateEvents={this.updateEvents} />
    //<NumberOfEvents result={this.filterEvents()} />

    //<ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" />
    //<Legend />
    //<Scatter name="B school" data={data02} fill="#82ca9d" />
  }
}

export default App;
