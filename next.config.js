module.exports = {
  reactStrictMode: false,
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false;
    }

    return config;
  }
};
