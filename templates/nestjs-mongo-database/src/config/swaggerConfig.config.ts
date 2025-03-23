import { DocumentBuilder } from '@/imports';
import envConfig from './envConfig.config';

const swaggerConfig = new DocumentBuilder()
  .setTitle(envConfig.SWAGGER_DOCS_TITLE)
  .setDescription(envConfig.SWAGGER_DOCS_DESCRIPTION)
  .setVersion(envConfig.SWAGGER_DOCS_VERSION)
  .addServer('/api/v1', 'version 1')
  .setContact(
    envConfig.SWAGGER_DOCS_CONTACT_NAME,
    envConfig.SWAGGER_DOCS_CONTACT_LINK,
    envConfig.SWAGGER_DOCS_CONTACT_MAIL,
  )
  .setExternalDoc(
    envConfig.SWAGGER_DOCS_EXTERNAL_DOC_TITTLE,
    envConfig.SWAGGER_DOCS_EXTERNAL_DOC_LINK,
  )
  .addBearerAuth()
  .build();
export default swaggerConfig;
