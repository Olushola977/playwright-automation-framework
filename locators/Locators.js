import LoginLocators from "./LoginLocators"

class Locators {
	constructor(page) {
		this.loginLocator = new LoginLocators(page)
	}
	getLocators(locator) {
		switch (locator) {
			case "login":
				return this.loginLocator
		}
	}
}

export default Locators
