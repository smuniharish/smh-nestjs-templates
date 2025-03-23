const RequestLoginSchema = {
  type: 'object',
  properties: {
    orderId: {
      type: 'string',
      minLength: 1,
    },
    otp: {
      type: 'string',
      min: 4,
      max: 4,
    },
  },
  required: ['orderId', 'otp'],
};
export default RequestLoginSchema;
