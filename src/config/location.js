const config = {
  distanceFilter: 5.0, // meters
  desiredAccuracy: {
    ios: 'best',
    android: 'balancedPowerAccuracy',
  },
};

const permissions = {
  ios: 'whenInUse',
  android: {
    detail: 'fine',
  },
};

module.exports = { config, permissions };
