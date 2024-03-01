import createNextIntlPlugin from 'next-intl/plugin';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const withNextIntl = createNextIntlPlugin();

const nextConfig = {};

export default withNextIntl(nextConfig);
