module.exports = {
  launch: {
    headless: true,
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    args: [
      '--window-size=1920,1080',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--shm-size=3gb',
    ],
  },
  browserContext: 'default',
};
