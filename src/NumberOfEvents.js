import React, { Component } from "react";
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    state = {
        nbrOfEvents: 32,
        errMessage: ''
    };

    // validate user input is between 1 and 32
    handleInputChanged = (event) => {
        const { value } = event.target;
        this.setState({ nbrOfEvents: value });
        if (value > 0 && value < 33) {
            this.setState({
                nbrOfEvents: value,
                errMessage: ''
            })
        }
        else {
            return this.setState({
                nbrOfEvents: '',
                errMessage: 'Please enter a number between 1 and 32.'
            })
        }
        this.props.updateEvents('', value);
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
                    value={this.props.nbrOfEvents}
                    onChange={this.handleInputChanged}
                />
                <ErrorAlert text={this.state.errMessage} />
            </div>
        );
    }
}

export default NumberOfEvents;