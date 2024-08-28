class LoginLocators {
	constructor(page) {
		this.emailField = page.getByRole("textbox", { name: "Email address" })
		this.passwordField = page.getByRole("textbox", { name: "Password" })
		this.loginButton = page.getByRole("button", { name: "Login" })
		this.errorToast = page.getByText(
			"Error: Sorry, incorrect email or password. Please check and try again"
		)
	}
}

export default LoginLocators
