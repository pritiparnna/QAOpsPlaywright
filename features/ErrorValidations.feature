Feature: Ecommerce2 validations
  @Validation
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed.

    Examples:
      | username                 | password     |
      | amitbaranpatra@gmail.com | Amit@2710    |
      | hello@123.com            | Iam hello212 |