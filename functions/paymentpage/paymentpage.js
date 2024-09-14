const PaymentPageLocators = require("../../locators/PaymentPageLocators")

class PaymentPage {
	constructor(page) {
		this.paymentPage = page
		this.locator = new PaymentPageLocators(this.paymentPage)
	}

	selectCurrency = async (currency) => {
		await this.locator.currencySelectField.waitFor({ visible: true })
		await this.locator.currencySelectField.click()
		await this.locator.currencyListDropdown.waitFor({ visible: true })
		await this.locator.selectCurrency(currency).first().click()
	}
	enterAmount = async (amount) => {
		await this.locator.amountField.fill("")
		await this.locator.amountField.pressSequentially(amount)
	}
	enterFirstName = async (firstname) => {
		await this.locator.firstnameField.fill(firstname)
	}
	enterLastName = async (lastname) => {
		await this.locator.lastnameField.fill(lastname)
	}
	enterEmail = async (email) => {
		await this.locator.emailField.fill(email)
	}
	checkMissingOrEmptyValues(obj, requiredKeys) {
		let missingOrEmptyKeys = []

		for (let key of requiredKeys) {
			if (
				!(key in obj) ||
				obj[key] === "" ||
				obj[key] === null ||
				obj[key] === undefined
			) {
				missingOrEmptyKeys.push(key)
			}
		}

		return missingOrEmptyKeys
	}
	fillPaymentDetails = async (data) => {
		if (Object.prototype.toString.call(data) !== "[object Object]") {
			console.error("Data should be a proper Object")
			return
		} else {
			const { currency, amount, firstname, lastname, email } = data
			await this.selectCurrency(currency)
			await this.enterAmount(amount)
			await this.enterFirstName(firstname)
			await this.enterLastName(lastname)
			await this.enterEmail(email)
		}
	}
	fillPaymentDetailsandProceedtoCheckout = async (data) => {
		await this.fillPaymentDetails(data)
		await this.locator.payButton.click()
	}
}

module.exports = PaymentPage
