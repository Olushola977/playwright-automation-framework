const CheckoutPageLocators = require("../../locators/CheckoutLocators")

class CheckoutPage {
	constructor(page) {
		this.page = page
		this.locator = new CheckoutPageLocators(page)
		this.loaderWait = this.locator.checkoutLoader.waitFor({
			hidden: true,
			timeout: 60000,
		})
	}

	checkoutView = () => {
		return this.locator.checkoutPage
	}

	selectCardPaymentOption = async () => {
		await this.locator.cardPaymentOption.click()
	}
	selectBankPaymentOption = async () => {
		await this.locator.bankPaymentOption.click()
	}
	selectBankTransferPaymentOption = async () => {
		await this.locator.banktransferPaymentOption.click()
	}
	selectGooglePayPaymentOption = async () => {
		await this.locator.googlepayPaymentOption.click()
	}
	selectEnairaPaymentOption = async () => {
		await this.locator.enairaPaymentOption.click()
	}
	selectOpayPaymentOption = async () => {
		await this.locator.opayPaymentOption.click()
	}
	selectNqrPaymentOption = async () => {
		await this.locator.nqrPaymentOption.click()
	}
	selectUssdPaymentOption = async () => {
		await this.locator.ussdPaymentOption.click()
	}
	selectPaymentMethod = async (method) => {
		const paymentMethod = method.toLowerCase()
		console.log("Checkout Method", paymentMethod)
		switch (paymentMethod) {
			case "bank transfer":
				return await this.selectBankTransferPaymentOption()
			case "bank":
				return await this.selectBankPaymentOption()
			case "card":
				return await this.selectCardPaymentOption()
			case "google pay":
				return await this.selectGooglePayPaymentOption()
			case "enaira":
				return await this.selectEnairaPaymentOption()
			case "nqr":
				return await this.selectNqrPaymentOption()
			case "opay":
				return await this.selectOpayPaymentOption()
			case "ussd":
				return await this.selectUssdPaymentOption()
			default:
				throw Error("Payment method is invalid or does not Exist...!")
		}
	}
}

module.exports = CheckoutPage
