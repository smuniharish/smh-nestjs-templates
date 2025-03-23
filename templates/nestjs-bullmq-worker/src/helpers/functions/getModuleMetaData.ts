import { ModuleMetadata } from '@/imports';

const getModuleMetaData = (
  imports: Array<any>,
  providers: Array<any>,
  exports: Array<any>,
): ModuleMetadata => {
  return { imports, providers, exports };
};
export default getModuleMetaData;
