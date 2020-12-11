import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
        nbrOfEvents: 32
    };


    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ nbrOfEvents: value });
    };

    render() {
        return (
            <div className="NumberOfEvents">
                <label>
                    Number of Events:
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