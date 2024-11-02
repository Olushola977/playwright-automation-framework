const { Given, When, Then } = require("@cucumber/cucumber")
const { expect } = require("@playwright/test")
const PaymentPage = require("../../../functions/paymentpage/paymentpage")
const CheckoutPage = require("../../../functions/checkout/checkout")
const BankTransferPage = require("../../../functions/checkout/banktransfer")
const CheckoutStatusPage = require("../../../functions/checkout/checkoutfinalstatus")
const BankPage = require("../../../functions/checkout/bank")
const trxData = require("../../../helpers/data/transactionData")
const OpayPage = require("../../../functions/checkout/opay")
const UssdPage = require("../../../functions/checkout/ussd")

//General method to be shared across scenarios
Given(
	"The customer is on the payment page",
	{ timeout: 600 * 1000 },
	async function () {
		try {
			await this.page.goto(`https://sandbox.flutterwave.com/pay/p0ik4yuk5tv1`, {
				waitUntil: "networkidle",
			})

			this.paymentPage = new PaymentPage(this.page)
			this.checkoutPage = new CheckoutPage(this.page)
			this.bankTransferPage = new BankTransferPage(this.page, 100)
			this.bankPage = new BankPage(this.page, 200)
			this.checkoutStatusPage = new CheckoutStatusPage(this.page)
			this.opayPage = new OpayPage(this.page, 100)
			this.ussdPage = new UssdPage(this.page)
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
		console.log("Entering payment details...")

		await this.paymentPage.fillPaymentDetailsandProceedtoCheckout(
			trxData.genericCheckoutData
		)
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

/**
 * Opay
 */

When("The customer clicks on the proceed button", async function () {
	const [newPage] = await Promise.all([
		this.context.waitForEvent("page"),
		await this.opayPage.continuePayment(),
	])
	this.validationPage = newPage
})

When(
	"The customer enters the phone number {string} and password {string}",
	async function (phoneNumber, password) {
		await this.validationPage
			.getByPlaceholder("Enter phone number")
			.first()
			.fill(phoneNumber)
		await this.validationPage
			.getByPlaceholder("Enter 6-digits password")
			.first()
			.fill(password)
		await this.validationPage.getByRole("button", { name: "Next" }).click()
	}
)

When("The customer enters OTP {string}", async function (otp) {
	await this.validationPage
		.getByPlaceholder("Enter dummy otp 12345")
		.first()
		.fill(otp)
	await this.validationPage.locator("#mocksubmit").click()
})

/**
 * USSD
 */
When(
	"The customer selects a bank {string} and click on the Pay button",
	async function (bank) {
		await this.ussdPage.selectBank(bank)
		await this.ussdPage.continuePayment()
	}
)

Then(
	"Verify the bank ussd code is displayed and click on the I have completed this payment button",
	async function () {
		await expect(this.ussdPage.displayUssdCode()).toBeVisible()
		await this.ussdPage.paymentCompleted()
	}
)
