import { dotenv, fs } from '@/imports';

const envConfig = dotenv.parse(fs.readFileSync(`.env.${process.env.NODE_ENV}`));
export default envConfig;
