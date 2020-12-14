import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
        nbrOfEvents: 32,
        errMessage: ''
    };

    handleInputChanged = (event) => {
        //const value = event.target.value;
        //this.setState({ nbrOfEvents: value });
        if (event.target.value > 0 && event.target.value < 33) {
            this.setState({
                nbrOfEvents: event.target.value,
                errMessage: ''
            })
        }
        else {
            return this.setState({
                nbrOfEvents: '',
                errMessage: 'Please enter a number between 1 and 32.'
            })
        }
        this.props.updateEvents('', event.target.value);
    };

    render() {
        return (
            <div className="NumberOfEvents">
                <label>
                    Show max. Events:
                </label>
                <input
                    type="text"
                    id="NumberOfEventsInput"
                    value={this.state.nbrOfEvents}
                    onChange={this.handleInputChanged}
                />
            </div>
        );
    }
}

export default NumberOfEvents;