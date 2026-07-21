Feature: Ecommerce validations
  @Regression
  Scenario: Placing the order
    Given a login to Ecommerce application with "amitbaranpatra@gmail.com" and "Amit@2710"
    When Add "ZARA COAT 3" to cart
    Then Verify "ZARA COAT 3" is displayed in the cart
    When Enter valid details and Place the order
    Then Verify the order is present in the OrderHistoryPage.
    Given a login to Ecommerce application with "rahulshetty@gmail.com" and "Iamking@00"

    @Validation
  Scenario Outline: Placing the order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed.

    Examples:
      | username                 | password     |
      | amitbaranpatra@gmail.com | Amit@2710    |
      | hello@123.com            | Iam hello212 |