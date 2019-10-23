import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';
import { HOST_URL, HOST_PORT } from 'react-native-dotenv';
import { AsyncStorage } from 'react-native';
// import host from '~/services/hostname';

if (__DEV__) {
  const tron = Reactotron.configure({
    port: parseInt(HOST_PORT),
    host: HOST_URL,
  })
    .useReactNative()
    .setAsyncStorageHandler(AsyncStorage)
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  tron.clear();
  console.tron = tron;
}
