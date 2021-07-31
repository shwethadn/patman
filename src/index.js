import React, { Fragment } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';
import Root from '@src/routes';
import AppNavigator from './routes';

const App = () => {
  return (
    <Fragment>
      {/* <SafeAreaView style={styles.navig}> */}
      {/* <Root onNavigationStateChange={(prevState, currentState) => {}} /> */}
      <AppNavigator />
      {/* </SafeAreaView> */}
    </Fragment>
  );
};

export default App;
