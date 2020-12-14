import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    test('When user has not specified a number of events 32 is the default number of events', ({ given, when, then }) => {
        given('the list of events is loaded', () => {

        });

        when('the user has not specified a number of events', () => {

        });

        then(/^the list of events will show (\d+) events by default$/, (arg0) => {

        });
    });

    test('User can change the number of events', ({ given, when, then }) => {
        given('the list of events is loaded', () => {

        });

        when('the user specifies the number of events', () => {

        });

        then('a list of specified number of events will be shown', () => {

        });
    });

});