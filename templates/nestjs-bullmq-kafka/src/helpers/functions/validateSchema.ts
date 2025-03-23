import { ajvConfig } from '@/config';
import {
  Ajv,
  ajvCustomFormatsRegistry,
  ajvCustomKeywordsRegistry,
  ajvErrors,
  ajvFormats,
} from '@/imports';

const ajv = new Ajv(ajvConfig);
ajvErrors(ajv);
ajvFormats(ajv);
ajvCustomFormatsRegistry(ajv);
ajvCustomKeywordsRegistry(ajv);
const formatted_error = (errors: any) => {
  const error_list: any = [];
  if (errors) {
    errors.forEach((error: any) => {
      if (
        !['not', 'oneOf', 'anyOf', 'allOf', 'if', 'then', 'else'].includes(
          error.keyword,
        )
      ) {
        const error_dict = {
          message: `${error.message}${
            error.params.allowedValues ? ` (${error.params.allowedValues})` : ''
          }${
            error.params.allowedValue ? ` (${error.params.allowedValue})` : ''
          }${
            error.params.additionalProperty
              ? ` (${error.params.additionalProperty})`
              : ''
          }`,
          details: error.instancePath,
        };
        error_list.push(error_dict);
      }
    });
  }
  return error_list;
};
const validateSchema = (data: object, schema: object) => {
  const validate = ajv.compile(schema);
  const isValid = validate(data);
  let formattedError = {};
  if (!isValid) {
    formattedError = formatted_error(validate.errors);
  }
  return { message: isValid, errors: formattedError };
};
export default validateSchema;
