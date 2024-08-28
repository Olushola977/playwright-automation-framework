export const appCookies = (loginData) => {
	return [
		{
			name: "koPorKe",
			value: JSON.stringify({
				flwAuthToken: loginData?.data["flw-auth-token"],
				v3XAppID: 1,
				nonBusinessCountry: "NG",
			}),
			domain: "app.flutterwave.com",
			path: "/",
			httpOnly: false,
			secure: true,
			sameSite: "Strict",
		},
		{
			name: "koPorkeeDtls",
			value: JSON.stringify({
				loginEmail: "olushola.adeyeye+qaprod@flutterwavego.com",
				phone: "+234",
				checkedMerchantAgreement: "1",
				userAccountId: 18428,
				companyParentAccountId: 1,
				parentAccountId: 2978617,
				bearsFee: 0,
				bearsintlfee: 0,
				userId: 2472719,
			}),
			domain: "app.flutterwave.com",
			path: "/",
			httpOnly: false,
			secure: true,
			sameSite: "Strict",
		},
		{
			name: "refresh-token",
			value: loginData?.data["refresh-token"],
			domain: "app.flutterwave.com",
			path: "/",
			httpOnly: false,
			secure: true,
			sameSite: "Strict",
		},
	]
}
