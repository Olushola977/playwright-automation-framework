const {
	Before,
	After,
	AfterStep,
	setDefaultTimeout,
} = require("@cucumber/cucumber")
const { chromium } = require("@playwright/test")
const fs = require("fs")
const path = require("path")

//Set a timeout for each step
// setDefaultTimeout(60 * 1000)

Before({ timeout: 500 * 1000 }, async function () {
	// Launch browser and create a new page
	this.page = await this.openBrowser()
})

// AfterStep(async function (scenario) {
// 	// Take a screenshot after every step
// 	const stepName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "_")
// 	const screenshotPath = path.resolve(
// 		`./screenshots/${scenario.pickle.name}.png`
// 	)
// 	await this.page.screenshot({ path: screenshotPath })
// 	console.log(`Screenshot saved at: ${screenshotPath}`)
// })

After(async function (scenario) {
	//If a scenario fails, take a screenshot
	// if (scenario.result.status === "FAILED") {
	// 	const screenshotPath = path.resolve(
	// 		`./screenshots/${scenario.pickle.name}-${new Date().getTime()}.png`
	// 	)
	// 	await this.page.screenshot({ path: screenshotPath })
	// 	console.log(`Screenshot saved at: ${screenshotPath}`)
	// }

	// Close the page and browser context
	await this.closeBrowser()
})
