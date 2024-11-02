const CheckoutPageLocators = require("../../locators/CheckoutLocators")

class OpayPage {
	constructor(page, amount) {
		this.checkoutPageLocators = new CheckoutPageLocators(page)
		this.checkoutPage = this.checkoutPageLocators.checkoutPage

		this.opayContinueButton = this.checkoutPage.getByRole("button", {
			name: `Proceed`,
		})
	}

	continuePayment = async () => {
		await this.opayContinueButton.click()
	}
}

module.exports = OpayPage
