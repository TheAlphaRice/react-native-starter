module.exports = {
    /**
      * Regex does not work for extensions.
      */
    extensions: ['.android.js', '.android.ts', '.android.tsx', '.ios.js', '.ios.ts', '.ios.tsx', '.jsx', '.js', '.ts', '.tsx', '.json'],
    root: './',
    alias: {
      '@app': ['./src'],
      '@e2e': './e2e',
      '@assets': ['./src/assets'],
      '@components': ['./src/components'],
      '@fixtures': ['./src/fixtures'],
      '@navigators': ['./src/navigators'],
      '@screens': ['./src/screens'],
      '@services': ['./src/services'],
      '@state': ['./src/state'],
      '@themes': ['./src/themes'],
      '@utilities': ['./src/utilities'],
    },
  };