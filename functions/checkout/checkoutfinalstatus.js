const CheckoutFinalStatus = require("../../locators/CheckoutFinalStatus")

class CheckoutStatusPage {
	constructor(page) {
		this.locator = new CheckoutFinalStatus(page)
	}
	loader = () => {
		return this.locator.loader
	}
	displayedSuccessView = () => {
		return this.locator.successView
	}
}

module.exports = CheckoutStatusPage
