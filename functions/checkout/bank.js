const CheckoutPageLocators = require("../../locators/CheckoutLocators")

class BankPage {
	constructor(page, amount) {
		this.checkoutPageLocators = new CheckoutPageLocators(page)
		this.checkoutPage = this.checkoutPageLocators.checkoutPage

		this.bankContinueButton = this.checkoutPage.getByRole("button", {
			name: `Proceed`,
		})
	}
	continuePayment = async () => {
		await this.bankContinueButton.click()
	}
}

module.exports = BankPage
