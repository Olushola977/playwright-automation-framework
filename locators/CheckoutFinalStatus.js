const CheckoutPageLocators = require("./CheckoutLocators")

class CheckoutFinalStatus {
	constructor(page) {
		this.checkoutPageLocators = new CheckoutPageLocators(page)
		this.checkoutPage = this.checkoutPageLocators.checkoutPage

		this.successView = this.checkoutPage.getByRole("heading", {
			name: "Thanks for your payment!",
		})
		this.loader = this.checkoutPage.locator(".loader-icon")
	}
}

module.exports = CheckoutFinalStatus
