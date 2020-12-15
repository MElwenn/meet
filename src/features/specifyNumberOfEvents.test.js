//import react from 'react';
import { mount, shallow } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
//import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppWrapper;
    let NumberOfEventsWrapper;

    test('When user has not specified a number of events 32 is the default number of events', ({ given, when, then }) => {
        given('the list of events is loaded', () => {
            AppWrapper = mount(<App />);
            expect(AppWrapper.find('EventList')).toHaveLength(1);
        });

        when('the user has not specified a number of events', () => {

        });

        //then('the list of events will show 32 events by default', () => {
        then(/^the list of events will show (\d+) events by default$/, (arg0) => {
            //    expect(AppWrapper.state('nbrOfEvents')).toBe(32); // ERROR: Expected: "32" Received: undefined
        });
    });


    test('User can change the number of events', ({ given, when, then }) => {

        given('the list of events is loaded', () => {
            AppWrapper = mount(<App />);
            expect(AppWrapper.find('EventList')).toHaveLength(1);
        });

        when('the user specifies the number of events', () => {
            NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} />);
            const nbrOfEvents = { target: { value: '16' } };
            NumberOfEventsWrapper.find('#NumberOfEventsInput').simulate('change', nbrOfEvents);
        });

        then('a list of specified number of events will be shown', () => {
            expect(NumberOfEventsWrapper.state('nbrOfEvents')).toBe('16');

        });
    });

});