import React, { Component } from 'react';
import './App.css';
import "./nprogress.css";

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { InfoAlert } from './Alert';
import { ErrorAlert } from './Alert'

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
    return (
      <div className="App">
        <h1>What's up next ...? </h1>
        <h2>Choose your City</h2>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <InfoAlert className="info-text" text={this.state.infoText} />
        <NumberOfEvents nbrOfEvents={this.state.result} updateEvents={this.updateEvents} />
        <ErrorAlert text={this.state.errMessage} />
        <EventList events={this.state.events} />
      </div>
    );
    //<NumberOfEvents nbrOfEvents={this.state.nbrOfEvents} updateEvents={this.updateEvents} />
    //<NumberOfEvents nbrOfEvents={this.state.result} updateEvents={this.updateEvents} />
    //<NumberOfEvents result={this.filterEvents()} />
  }
}


export default App;
