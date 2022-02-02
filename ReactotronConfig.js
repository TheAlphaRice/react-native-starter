import { NativeModules } from 'react-native';
import Reactotron, { networking } from 'reactotron-react-native';
import ReactotronFlipper from 'reactotron-react-native/dist/flipper';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

if (__DEV__) { // NOSONAR
  const { scriptURL } = NativeModules.SourceCode;
  const scriptHostname = scriptURL.split('://')[1].split(':')[0];

  Reactotron
    .configure({
      createSocket: path => new ReactotronFlipper(path),
      host: scriptHostname,
    })
    .useReactNative()
    .use(reactotronRedux())
    .use(sagaPlugin())
    .use(
      networking({
        ignoreUrls: /rollout.io/,
      }),
    )
    .connect();

  console.tron = Reactotron;
} else {
  // no-op so that production code can keep console.tron.log statements
  console.tron = { log: () => false };
}