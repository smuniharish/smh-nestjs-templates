interface GenerateOtpI {
  mobileNumber: string;
  countryCode: string;
  role: string;
}
interface LoginI {
  orderId: string;
  otp: string;
}
interface GetAccessTokenI {
  refreshToken: string;
}
export { GenerateOtpI, LoginI, GetAccessTokenI };
