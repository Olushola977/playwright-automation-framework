const report = require("multiple-cucumber-html-reporter")

report.generate({
	jsonDir: "test-results",
	reportPath: "test-results/reports/",
	reportName: "Playwright Automation Report",
	pageTitle: "F4B Platform Test Report",
	displayDuration: true,
	metadata: {
		browser: {
			name: "chrome",
			version: "112",
		},
		device: "Olushola - PC",
		platform: {
			name: "osx",
			version: "13.4",
		},
	},
	customData: {
		title: "Test Info",
		data: [
			{ label: "Project", value: "F4B (Checkout)" },
			{ label: "Release", value: "1.0" },
			{ label: "Cycle", value: "Regression" },
		],
	},
})
