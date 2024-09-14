const { setWorldConstructor } = require("@cucumber/cucumber")
const { chromium } = require("@playwright/test")

class CustomWorld {
	constructor() {
		this.browser = null
		this.context = null
		this.page = null
	}

	async openBrowser() {
		this.browser = await chromium.launch({
			headless: true,
			args: ["--disable-gpu", "--no-sandbox"],
		})
		this.context = await this.browser.newContext()
		this.page = await this.context.newPage()
		return this.page
	}

	async closeBrowser() {
		await this.page.close()
		await this.context.close()
		await this.browser.close()
	}
}

setWorldConstructor(CustomWorld)
