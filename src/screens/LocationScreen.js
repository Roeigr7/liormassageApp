import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import WrapperScreen from '../shared/WrapperScreen';
import { showLocation } from 'react-native-map-link';
import BrandIcon from '../customStyles/BrandIcon';
import waze from '../../assets/icons/waze.png';
import googleMaps from '../../assets/icons/googleMaps.png';
import { g1 } from '../../utilities/Images';
import * as Animatable from 'react-native-animatable';

const openApp = (linkedApp) => {
  showLocation({
    latitude: 33.22180077145721,
    longitude: 35.622831494574484,
    googleForceLatLon: true,
    alwaysIncludeGoogle: true,
    appsWhiteList: [linkedApp], // optionally set which apps to show (default: will show all supported apps installed on device)
  });
};
const LocationScreen = () => {
  return (
    <WrapperScreen headerText={'איך מגיעים'} image={g1}>
      <View style={styles.container}>
        <Text style={styles.title}>איך מגיעים</Text>
        <Text style={styles.addresstext}>
          אנחנו נמצאים בקיבוץ הגושרים בכתובת 4/10
        </Text>
        <Text style={styles.gpstext}>נווט עם</Text>
        <Animatable.View
          style={styles.iconcontainer}
          animation={'flipInY'}
          delay={400}
          duration={1200}
          useNativeDriver={true}
        >
          <BrandIcon
            icon={waze}
            brand={'Waze'}
            onPress={() => openApp('waze')}
          />
          <BrandIcon
            icon={googleMaps}
            brand={'GoogleMaps'}
            onPress={() => openApp('google-maps')}
          />
        </Animatable.View>
      </View>
      {/* <View style={styles.mapcontainer}>
				<MapView
					style={styles.map}
					region={{
						latitude: 33.22180077145721,
						longitude: 35.622831494574484,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					}}
				>
					<MapView.Marker
						coordinate={{
							latitude: 33.22180077145721,
							longitude: 35.622831494574484,
						}}
						title={"Lior"}
					/>
				</MapView>
			</View> */}
    </WrapperScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
  },
  title: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: 'comix',
    color: '#d9b310',
    marginBottom: 16,
  },
  addresstext: {
    color: 'white',
    textAlign: 'center',
  },
  iconcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gpstext: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: 'comix',
    color: '#d9b310',
    marginVertical: 10,
  },
  mapcontainer: {
    alignSelf: 'center',
    borderColor: '#d9b310',
    borderWidth: 2,
    borderRadius: 20,
    marginVertical: 15,
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.3,
    overflow: 'hidden',
  },
  map: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.4,
  },
});

export default LocationScreen;
