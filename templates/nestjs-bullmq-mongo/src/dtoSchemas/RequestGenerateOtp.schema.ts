const RequestGenerateOtpSchema = {
  type: 'object',
  properties: {
    mobileNumber: {
      type: 'string',
      minLength: 10,
      maxLength: 10,
    },
    countryCode: {
      type: 'string',
      minLength: 3,
    },
    role: {
      type: 'string',
      minLength: 1,
    },
  },
  required: ['mobileNumber', 'countryCode', 'role'],
};
export default RequestGenerateOtpSchema;
