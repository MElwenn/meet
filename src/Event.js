import React, { Component } from "react";

class Event extends Component {
    state = {
        event: {},
        showDetails: false
    };

    handleShowDetails = () => {
        this.setState({ showDetails: !this.state.showDetails });
    };

    render() {
        const { event } = this.props;
        const { showDetails } = this.state;

        return (
            <div className="event">
                <div className="event-container">
                    <div className="event-elements">
                        <p className="event-title">{event.summary}</p>
                        <p className="event-location">{event.location}</p>
                        <p className="event-date">{event.start.dateTime}</p>
                        <button className="event-container-button" onClick={() => this.handleShowDetails()}>
                            {showDetails ? "Hide Details" : "Show Details"}
                        </button>
                    </div>
                    {showDetails && (
                        <div className="event-details">
                            <p className="event-description">{event.description}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
export default Event;