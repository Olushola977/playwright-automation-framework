const CheckoutPageLocators = require("../../locators/CheckoutLocators")

class BankTransferPage {
	constructor(page, amount, expect) {
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

	displayedTransferAmount = () => {
		return this.bankTransferAmount
	}
	displayedTransferBank = () => {
		return this.bankTransferBank
	}
	displayedTransferBeneficiary = () => {
		return this.bankTransferBeneficiary
	}
	displayedTransferAccountNumber = () => {
		return this.bankTransferAccountNumber
	}
	continuePayment = async () => {
		await this.bankTransferPayButton.click()
	}
}

module.exports = BankTransferPage
