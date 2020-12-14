import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        //NumberOfEventsWrapper = shallow(<NumberOfEvents />); //Ali's advice: <NumberOfEvents updateEvents={() => null} />, but "empty better than null"
        NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} />);
    })

    test('render textbox element', () => {
        expect(NumberOfEventsWrapper.find('.NumberOfEvents')).toHaveLength(1);
    });

    test('render textbox input correctly', () => {
        const nbrOfEvents = NumberOfEventsWrapper.state('nbrOfEvents');
        expect(NumberOfEventsWrapper.find('#NumberOfEventsInput').prop('value')).toBe(nbrOfEvents);
    });

    test('change state if user changes number of events', () => {
        const EventAmount = { target: { value: 32 } };
        NumberOfEventsWrapper.find('#NumberOfEventsInput').simulate('change', EventAmount);
        expect(NumberOfEventsWrapper.state('nbrOfEvents')).toBe(32);
    });

    test('show number of events edited', () => {
        expect(NumberOfEventsWrapper.find('.NumberOfEvents label')).toHaveLength(1);
    });

});
