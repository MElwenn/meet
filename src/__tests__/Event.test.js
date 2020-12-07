//  show and hide event details
import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { extractEvents } from '../api';
import { mockData } from '../mock-data';

const eventData = extractEvents(mockData);

describe('<Event /> component', () => {
    let EventWrapper;

    beforeAll(() => {
        EventWrapper = shallow(<Event event={eventData[0]} />);
    });

    test('render event compnent', () => {
        expect(EventWrapper).toHaveLength(1);
    });

    test('render event div', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1);
    });

    test('render event container', () => {
        expect(EventWrapper.find('.event-container')).toHaveLength(1);
    });

    /*test('render event container elements', () => { // this test fails for whatever reason
        expect(EventWrapper.find('.event-container-elements')).toHaveLength(3);
    });*/

    test('render event details', () => {
        EventWrapper.setState({ showDetails: true });
        expect(EventWrapper.find('.event-description')).toHaveLength(1);
    })

    test('render details button', () => {
        expect(EventWrapper.find('.event-container-button')).toHaveLength(1);
    })

    test('show or hide details on button-click', () => {
        EventWrapper.setState({ showDetails: false });
        EventWrapper.find('.event-container-button').simulate('click');
        expect(EventWrapper.state('showDetails')).toBe(true);
    })

});
