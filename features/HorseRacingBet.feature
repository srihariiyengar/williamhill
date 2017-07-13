Feature: Add a Horse racing bet

  @SK
  Scenario Outline: Add a Horse racing bet to the Bet slip and add a stake of $10.5
    Given I navigate to the William Hill website
    When I click on the Racing link
      And I click on any of the runners
      And I enter the Stake amount as <Amount>
      And I click on Add to Bet Slip
    Then I see the Bet Slip added with the <Amount>
    Examples:
      | Amount |
      | $10.50 |