//import react from 'react';
//import { mount, shallow } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
//import App from '../App';
//import Event from '../Event';
//import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

    //let AppWrapper;
    //let EventWrapper;

    test('An event element is collapsed by default', ({ }) => {

    });

    test('User can expand an event to see its details', ({ }) => {

    });

    /*test('An event element is collapsed by default', ({ given, when, then }) => {
  
        given('the app has been opened', () => {
            AppWrapper = mount(<App />);
            expect(AppWrapper.find('EventList')).toHaveLength(1);
        });
        when('the user views the list of events', () => {
  
        });
        then('the list of collapsed events will be loaded', () => {
            EventWrapper = mount(<Event event={mockData[0]} />);
            expect(EventWrapper.state('showDetails')).toEqual(false);
        });
    });
  
    test('User can expand an event to see its details', ({ }) => {
  
    });
  
    test('User can expand an event to see its details', ({ given, when, then }) => {
        given('the list of collapsed events has been loaded', () => {
            AppWrapper = mount(<App />);
            expect(AppWrapper.find('EventList')).toHaveLength(1);
        });
        when('the user clicks show events details', () => {
            EventWrapper = mount(<Event event={mockData[0]} />);
            expect(EventWrapper.state('showDetails')).toEqual(false);
            EventWrapper.find('.event-details').simulate('click');
        });
        then('the detail of the clicked event will be loaded', () => {
            expect(EventWrapper.state('showDetails')).toEqual(true);
        });
    });
  
    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        given('the detail of the clicked event has been loaded', () => {
            EventWrapper = shallow(<Event event={mockData[0]} />);
            expect(EventWrapper.state('showDetails')).toEqual(true);
        });
        when('the user clicks hide events details', () => {
            EventWrapper.find('.event-details').simulate('click');
        });
        then('the detail of the clicked event will collapse', () => {
            expect(EventWrapper.state('showDetails')).toEqual(false);
        });
    });*/
});
