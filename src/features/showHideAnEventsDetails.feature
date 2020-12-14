Feature: Show/Hide an events details

  Scenario: An event element is collapsed by default
    Given the app has been opened
    When the user views the list of events
    Then the list of collapsed events will be loaded

  Scenario: User can expand an event to see its details
    Given the list of collapsed events has been loaded
    When the user clicks show events details
    Then the detail of the clicked event will be loaded

  Scenario: User can collapse an event to hide its details
    Given the detail of the clicked event has been loaded
    When the user clicks hide events details
    Then the detail of the clicked event will collapse
