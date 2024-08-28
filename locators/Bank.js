const CheckoutPageLocators = require("./CheckoutLocators")

class BankPageLocators {
	constructor(page, amount) {
		this.amount = amount || 0
		this.checkoutPageLocators = new CheckoutPageLocators(page)
		this.checkoutPage = this.checkoutPageLocators.checkoutPage

		this.bankContinueButton = this.checkoutPage.getByRole("button", {
			name: `Proceed`,
		})
	}
}

module.exports = BankPageLocators
