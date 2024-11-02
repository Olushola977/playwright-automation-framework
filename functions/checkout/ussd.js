const CheckoutPageLocators = require("../../locators/CheckoutLocators")

class UssdPage {
	constructor(page, amount) {
		this.checkoutPageLocators = new CheckoutPageLocators(page)
		this.checkoutPage = this.checkoutPageLocators.checkoutPage

		this.selectBankField = this.checkoutPage.locator(
			"select[name='SELECT BANK']"
		)
		this.ussdContinueButton = this.checkoutPage.locator("button[type='submit']")
		this.ussdCode = this.checkoutPage.locator("a[rel='nofollow']")
		this.paymentCompletedBtn = this.checkoutPage.getByRole("button", {
			name: "I have completed this payment",
		})
	}
	selectBank = async (bank) => {
		await this.selectBankField.selectOption(bank)
	}
	continuePayment = async () => {
		await this.ussdContinueButton.click()
	}
	displayUssdCode = () => {
		return this.ussdCode
	}
	paymentCompleted = async () => {
		await this.paymentCompletedBtn.click()
	}
}

module.exports = UssdPage
