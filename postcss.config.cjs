module.exports = {
  plugins: {
    tailwindcss: {
      config: async () => {
        const config = await import('./tailwind.config.js');
        return config.default;
      },
    },
    autoprefixer: {},
  },
};