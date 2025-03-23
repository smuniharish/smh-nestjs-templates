import { ServeStaticModuleOptions, join } from '@/imports';

const staticConfig: ServeStaticModuleOptions = {
  rootPath: join(__dirname, '..', '../Logs'),
  serveRoot: '/logs',
  useGlobalPrefix: true,
};
export default staticConfig;
