class PaymentPageLocators {
	constructor(page) {
		this.page = page
		this.currencySelectField = this.page.locator(".dropdown button")
		this.currencyListDropdown = this.page.locator(".dropdown-menu")
		this.amountField = this.page.locator("input#amount")
		this.firstnameField = this.page.locator("input#first-name")
		this.lastnameField = this.page.locator("input#last-name")
		this.emailField = this.page.locator("input#email")
		this.payButton = this.page.getByRole("button", { name: "Pay" })
	}
	selectCurrency(currency) {
		return this.page.getByRole("button", { name: currency })
	}
}

module.exports = PaymentPageLocators
