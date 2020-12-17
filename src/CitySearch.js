import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
    state = {
        query: '',
        locations: [],
        suggestions: [],
        showSuggestions: false,
        infoText: ''
    }

    // added to "load a list of events by default"
    componentDidMount() {
        this.setState({ locations: this.props.locations });
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ showSuggestions: true });
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        if (suggestions.length === 0) {
            this.setState({
                query: value,
                infoText: 'Sorry, City could not be found, please check and try again.',
            });
        } else {
            return this.setState({
                query: value,
                suggestions,
                infoText: ''
            });
        }
    };

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false
        });

        this.props.updateEvents(suggestion);
    }

    render() {
        return (
            <div className="CitySearch">

                <InfoAlert text={this.state.infoText} />

                <input type="text"
                    className="city"
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                    onFocus={() => { this.setState({ showSuggestions: true }) }}
                />

                <ul className="suggestions" style={this.state.showSuggestions ? {} : { display: 'none' }} >
                    {this.state.suggestions.map((suggestion) => (
                        <li
                            key={suggestion}
                            onClick={() => this.handleItemClicked(suggestion)}
                        >{suggestion}</li>
                    ))}
                    <li onClick={() => this.handleItemClicked("all")}>
                        <b>See all cities</b>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CitySearch;