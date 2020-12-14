Feature: Specify number of events

  Scenario: When user has not specified a number of events 32 is the default number of events
    Given the list of events is loaded
    When the user has not specified a number of events
    Then the list of events will show 32 events by default

  Scenario: User can change the number of events
    Given the list of events is loaded
    When the user specifies the number of events
    Then a list of specified number of events will be shown
