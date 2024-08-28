class CheckoutPageLocators {
	constructor(page) {
		this.checkoutPage = page.frameLocator("iframe[name='checkout']")
		this.testmodeBanner = this.checkoutPage.locator("main").getByRole("main")

		//loader
		this.checkoutLoader = this.checkoutPage.locator(".loader-icon")
		// .locator("div.testmode__info")
		this.cardPaymentOption = this.checkoutPage
			.getByRole("option", { name: "Card Payment" })
			.locator("button")
		this.googlepayPaymentOption = this.checkoutPage
			.getByRole("option", { name: "Google Pay Payment" })
			.locator("button")
		this.ussdPaymentOption = this.checkoutPage
			.getByRole("option", { name: "USSD Payment" })
			.locator("button")
		this.bankPaymentOption = this.checkoutPage
			.getByRole("option", { name: "Bank Payment" })
			.locator("button")
		this.banktransferPaymentOption = this.checkoutPage
			.getByRole("option", { name: "Bank Transfer Payment" })
			.locator("button")
		this.enairaPaymentOption = this.checkoutPage
			.getByRole("option", { name: "eNaira Payment" })
			.locator("button")
		this.opayPaymentOption = this.checkoutPage
			.getByRole("option", { name: "OPay Payment" })
			.locator("button")
		this.nqrPaymentOption = this.checkoutPage
			.getByRole("option", { name: "NQR Payment" })
			.locator("button")

		//Bank transfer locators
	}
}

module.exports = CheckoutPageLocators
