const CheckoutPageLocators = require("./CheckoutLocators")

class BankTransferPageLocators {
	constructor(page, amount) {
		this.amount = amount || 0
		this.checkoutPageLocators = new CheckoutPageLocators(page)
		this.checkoutPage = this.checkoutPageLocators.checkoutPage

		this.bankTransferContinueButton = this.checkoutPage.getByRole("button", {
			name: `Pay NGN 200`,
		})
		this.bankTransferPayButton = this.checkoutPage.getByRole("button", {
			name: "I have made this bank transfer",
		})
		this.bankTransferAmount = this.checkoutPage.getByRole("heading", {
			name: `NGN 200`,
		})
		this.bankTransferAccountNumber = this.checkoutPage.getByRole("heading", {
			name: "0067100155",
		})
		this.bankTransferBank = this.checkoutPage.getByRole("heading", {
			name: "Mock Bank",
		})
		this.bankTransferBeneficiary = this.checkoutPage.getByRole("heading", {
			name: "Aminat Enterprises",
		})
	}
}

module.exports = BankTransferPageLocators
