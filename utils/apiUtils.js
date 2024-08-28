import { default as emailUtils } from "./emailUtils"
const gmail = require("gmail-tester")

class APIUtils {
	constructor(apiContext) {
		this.apiContext = apiContext
	}
	async userLogin(loginPayload, emailPage) {
		const emailUtil = new emailUtils(emailPage, gmail)

		const loginResponse = await this.apiContext.post(
			"https://api-dashboard.flutterwave.com/login?version=3.0&device_id=b8aa6a26a65abe65e1914f4e31a1d8c3",
			{
				data: loginPayload,
				headers: {
					"V3-Xapp-Id": "1",
				},
			}
		)
		const responseJson = await loginResponse.json()
		const authToken = responseJson.data["flw-auth-token"]
		console.log(responseJson)
		const merchantBusiness = await this.apiContext.get(
			"https://api-dashboard.flutterwave.com/v2/merchant/businesses?verbose=1&appId=1",
			{
				headers: {
					"Flw-Auth-Token": authToken,
				},
			}
		)
		const businessResponse = await merchantBusiness.json()
		console.log(businessResponse)
		const merchantBusinessID = businessResponse.data[0].id
		//Send OTP
		const sendLoginOTP = await this.apiContext.post(
			"https://api-dashboard.flutterwave.com/merchant/tokens/create?version=3.0",
			{
				data: { account: merchantBusinessID, resend_otp: false },
				headers: {
					"flw-auth-token": authToken,
					"V3-Xapp-Id": "1",
				},
			}
		)
		const OTPResponse = await sendLoginOTP.json()
		console.log(OTPResponse)
		//Get OTP Code send to Email
		const code = await emailUtil.getOTPCode()
		console.log(await code)
		//Send Login OTP Code
		const inputOTP = await this.apiContext.post(
			"https://api-dashboard.flutterwave.com/merchant/tokens/create?version=3.0",
			{
				data: { account: merchantBusinessID, rave_otp: code },
				headers: {
					"flw-auth-token": authToken,
					"V3-Xapp-Id": "1",
				},
			}
		)
		const loginStatus = await inputOTP.json()
		console.log("loginStatus =>", loginStatus)
		return loginStatus
		// const token = responseJson.token
		// const userId = responseJson.userId
		// return { token: token, userId: userId }
	}

	async createOrder(token, orderPayload) {
		const orderResponse = await this.apiContext.post(
			"https://rahulshettyacademy.com/api/ecom/order/create-order",
			{
				data: orderPayload,
				headers: {
					Authorization: token,
					"Content-Type": "application/json",
				},
			}
		)
		const orderResponseJson = await orderResponse.json()
		const orderId = orderResponseJson?.orders[0]
		return orderId
	}
}

export default { APIUtils }
