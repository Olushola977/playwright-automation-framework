Feature: Checkout

    Completing payments via Checkout using different payment methods
    Scenario: Complete a Successful Payment using Bank Transfer Method
        Given The customer is on the payment page
        When The customer enters valid payment information and selects the "bank transfer" payment method
        Then Verify that the bank imformation is displayed
        When The customer clicks on the button to proceed with payment
        Then The payment should be successful

    Scenario: Complete a Successful Payment using Bank Method
        Given The customer is on the payment page
        When The customer enters valid payment information and selects the "bank" payment method
        And The customer clicks on the continue button
        Then Verify the customer is redirected to the bank page for authentication
        When The customer enters the account number "1234567890" and password "123456"
        And Customer clicks on the log in button
        Then The payment should be successful