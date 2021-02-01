import React, { useState } from 'react';

import { Provider as AuthProvider } from './src/context/auth-context';
import { Provider as BookingProvider } from './src/context/booking-context';
import { Provider as ModalProvider } from './src/context/modal-context';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import fetchFonts from './fonts';
import RootModal from './src/modals/RootModal';
import { DrawerNavigator } from './src/navigators/DrawerNavigator';
import { navigationRef } from './src/navigators/RootNavigator';
export default App = () => {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  } else
    return (
      <AuthProvider>
        <BookingProvider>
          <ModalProvider>
            <NavigationContainer ref={navigationRef} initialRouteName='Home'>
              <DrawerNavigator />
            </NavigationContainer>

            <RootModal />
          </ModalProvider>
        </BookingProvider>
      </AuthProvider>
    );
};
