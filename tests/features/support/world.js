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
		this.context = await this.browser.newContext({
			userAgent:
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
			viewport: { width: 1440, height: 722 },
			// recordVideo: {
			// 	dir: "test-results/videos", // Directory to save videos
			// },
		})
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
