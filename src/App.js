import React, { Component } from 'react';
import './App.css';
import "./nprogress.css";

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: '',
    selectedLocation: 'all'
  };

  //filter the results based on location
  updateEvents = (location, eventCount) => {
    const { selectedLocation, numOfEvents } = this.state;
    if (location) {
      getEvents().then((events) => {
        const locationEvents = (location === 'all') ?
          events : events.filter((event) => event.location === location);
        const filteredEvents = locationEvents.slice(0, numOfEvents);
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
          numOfEvents: eventCount
        });
      });
    }
  }

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
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });

    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    })
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <h1>What's up next ...? </h1>
        <h2>Select your City</h2>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <NumberOfEvents result={this.filterEvents()} />
      </div>
    );
    //<NumberOfEvents numOfEvents={this.state.numOfEvents} updateEvents={this.updateEvents} />
  }
}


export default App;
