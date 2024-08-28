class emailUtils {
	constructor(page, gmail) {
		this.emailPage = page
		this.gmail = gmail
	}

	getOTPCode = async () => {
		// await this.emailPage.waitForTimeout(7000)
		const email = await this.gmail.check_inbox(
			"credentials.json",
			"token.json",
			{
				subject: "Flutterwave Confirmation Code", // We are looking for 'Flutterwave Confirmation Code' in the subject of the message.
				from: "noreply@flutterwavego.com", // We are looking for a sender header which is 'no-reply@domain.com'.
				to: "olushola.adeyeye+qaprod@flutterwavego.com", // Which inbox to poll. credentials.json should contain the credentials to it.
				wait_time_sec: 10, // Poll interval (in seconds).
				max_wait_time_sec: 30, // Maximum poll time (in seconds), after which we'll giveup.
				after: new Date(),
				include_body: true,
			}
		)
		const emailData = email[0]

		await this.emailPage.setContent(emailData.body.html)
		const confirmationCode = await this.emailPage.textContent("p.nomText")
		const code = confirmationCode.trim().split("is")[1].slice(0, -1)
		return code
	}
}

export default emailUtils
