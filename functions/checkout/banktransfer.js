const BankTransferPageLocators = require("../../locators/BankTransfer")

class BankTransferPage {
	constructor(page, amount) {
		this.locator = new BankTransferPageLocators(page, amount)
	}

	displayedTransferAmount = () => {
		return this.locator.bankTransferAmount
	}
	displayedTransferBank = () => {
		return this.locator.bankTransferBank
	}
	displayedTransferBeneficiary = () => {
		return this.locator.bankTransferBeneficiary
	}
	displayedTransferAccountNumber = () => {
		return this.locator.bankTransferAccountNumber
	}
	continuePayment = async () => {
		await this.locator.bankTransferPayButton.click()
	}
}

module.exports = BankTransferPage
