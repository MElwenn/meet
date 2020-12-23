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
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, /* PieChart, Pie, Sector, Cell */
} from 'recharts';
import EventGenre from './EventGenre';

class App extends Component {
  state = {
    events: [],
    locations: [],
    NumberOfEvents: 32,
    selectedLocation: 'all',
    infoText: '',
    //genres: []
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
    const gridData = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(' ').shift()
      return { city, number };
    })
    return gridData;
  };

  /* eventGenre = ({ events }) => {
    const [genreData, setGenreData] = useState([]);
    useEffect(() => {
      setGenreData(() => getGenreData());
    }, [events]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const getGenreData = () => {
      const genres = ['React', 'AngularJS', 'jQuery', 'Node', 'JavaScript'];
      const genreData = genres.map((genre) => {
        const value = events.filter(({ summary }) => summary.split('').includes(genre)).length;
        return { name: genre, value };
      });

      return genreData;
    }
  }; */

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
    //const { summary } = this.state;
    return (
      <div className="App">
        <h1>What's up next ...? </h1>
        <h2>Choose your City</h2>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <InfoAlert className="info-text" text={this.state.infoText} />
        <NumberOfEvents nbrOfEvents={this.state.result} updateEvents={this.updateEvents} />
        <ErrorAlert text={this.state.errMessage} />
        <h4>Events in each city</h4>
        <ResponsiveContainer height={400} >
          <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />

            <Tooltip cursor={{ strokeDasharray: '3 3' }} />

            <Scatter data={this.getData()} fill="#8884d8" />

          </ScatterChart>
        </ResponsiveContainer>
        <h4>Popularity of Genres</h4>
        <EventGenre events={this.state.events} />
        {/*<ResponsiveContainer height={400} >
          <PieChart id="container">
            <Pie
              genreData={genreData}
              cx={200}
              cy={200}
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {
                genre.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} Name={entry.name} />)
              }
            </Pie>
          </PieChart>
            </ResponsiveContainer>*/}
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
