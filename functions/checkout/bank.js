const BankPageLocators = require("../../locators/Bank")

class BankPage {
	constructor(page, amount) {
		this.locator = new BankPageLocators(page, amount)
	}
	continuePayment = async () => {
		await this.locator.bankContinueButton.click()
	}
}

module.exports = BankPage
