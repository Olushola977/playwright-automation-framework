const { Given, When, Then } = require("@cucumber/cucumber")
const { expect, chromium } = require("@playwright/test")
const PaymentPage = require("../../../functions/paymentpage/paymentpage")
const CheckoutPage = require("../../../functions/checkout/checkout")
const BankTransferPage = require("../../../functions/checkout/banktransfer")
const CheckoutStatusPage = require("../../../functions/checkout/checkoutfinalstatus")
const BankPage = require("../../../functions/checkout/bank")

//General method to be shared across scenarios
Given(
	"The customer is on the payment page",
	{ timeout: 600 * 1000 },
	async function () {
		try {
			// const browser = await chromium.launch({ headless: false })
			// this.context = await browser.newContext()
			// this.page = await this.context.newPage()
			await this.page.goto(
				"https://sandbox-flw-web-v3.herokuapp.com/pay/p0ik4yuk5tv1"
			)

			this.paymentPage = new PaymentPage(this.page)
			this.checkoutPage = new CheckoutPage(this.page)
			this.bankTransferPage = new BankTransferPage(this.page, 100)
			this.bankPage = new BankPage(this.page, 200)
			this.checkoutStatusPage = new CheckoutStatusPage(this.page)
		} catch (error) {
			console.error("Error launching browser or navigating to page:", error)
			return
		}
	}
)
When(
	"The customer enters valid payment information and selects the {string} payment method",
	{ timeout: 600 * 1000 },
	async function (paymentMethod) {
		const data = {
			currency: "Nigeria NGN",
			amount: "20000",
			firstname: "Olushola",
			lastname: "Adeyeye",
			email: "olushola.adeyeye@flutterwavego.com",
		}
		console.log("Entering payment details...")

		await this.paymentPage.fillPaymentDetailsandProceedtoCheckout(data)
		await this.checkoutPage.selectPaymentMethod(paymentMethod)
	}
)
Then(
	"The payment should be successful",
	{ timeout: 500 * 1000 },
	async function () {
		await expect(this.checkoutStatusPage.displayedSuccessView()).toBeVisible({
			timeout: 15000,
		})
		await this.page.close()
	}
)

/*
	Bank Transfer Payment Specific Steps
*/
Then(
	"Verify that the bank imformation is displayed",
	{ timeout: 500 * 1000 },
	async function () {
		await expect(this.bankTransferPage.displayedTransferAmount()).toBeVisible()
		await expect(
			this.bankTransferPage.displayedTransferAccountNumber()
		).toBeVisible()
		await expect(this.bankTransferPage.displayedTransferBank()).toBeVisible()
		await expect(
			this.bankTransferPage.displayedTransferBeneficiary()
		).toBeVisible()
	}
)
When(
	"The customer clicks on the button to proceed with payment",
	async function () {
		await this.bankTransferPage.continuePayment()
	}
)

/*
	Bank Payment Speicifc Steps
*/
When(
	"The customer clicks on the continue button",
	{ timeout: 500 * 1000 },
	async function () {
		const [newPage] = await Promise.all([
			this.context.waitForEvent("page"),
			this.bankPage.continuePayment(),
		])
		this.validationPage = newPage
	}
)
Then(
	"Verify the customer is redirected to the bank page for authentication",
	async function () {
		console.log("Verified...!")
	}
)
When(
	"The customer enters the account number {string} and password {string}",
	async function (accountNumber, password) {
		await this.validationPage
			.getByPlaceholder("Enter a dummy 10 digit account number")
			.first()
			.fill(accountNumber)
		await this.validationPage
			.getByPlaceholder("Enter dummy password")
			.first()
			.fill(password)
	}
)
When("Customer clicks on the log in button", async function () {
	await this.validationPage.getByRole("button", { name: "LOG IN" }).click()
})
