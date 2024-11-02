module.exports = {
	default: {
		tags: process.env.npm_config_TAGS || "",
		formatOptions: {
			snippetInterface: "async-await",
		},
		paths: ["tests/features/*.feature"],
		dryRun: false,
		require: [
			"tests/features/step_definitions/*.js",
			"tests/features/support/*.js",
		],
		// requireModule: ["ts-node/register"],
		format: [
			"progress-bar",
			"html:test-results/cucumber-report.html",
			"json:test-results/cucumber-report.json",
			"rerun:@rerun.txt",
		],
		parallel: 4,
	},
	rerun: {
		formatOptions: {
			snippetInterface: "async-await",
		},
		dryRun: false,
		require: [
			"tests/features/step_definitions/*.js",
			"tests/features/support/*.js",
		],
		// requireModule: ["ts-node/register"],
		format: [
			"progress-bar",
			"html:test-results/cucumber-report.html",
			"json:test-results/cucumber-report.json",
			"rerun:@rerun.txt",
		],
		parallel: 4,
	},
}
