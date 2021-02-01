import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { aboutImages } from '../../utilities/constantArrays';
import { aboutText } from '../../utilities/texts/about';
import WrapperScreen from '../shared/WrapperScreen';
import { g5 } from '../../utilities/Images';
import { SliderBox } from 'react-native-image-slider-box';
const AboutScreen = () => {
  return (
    <WrapperScreen headerText={'אודות'} image={g5}>
      <View style={styles.container}>
        <Text style={styles.title}>מי אני</Text>
        <Text style={styles.abouttext}>{aboutText}</Text>
      </View>

      {aboutImages.map((item, i) => (
        <View key={i}>
          <Text style={styles.textimage}>{item.desc}</Text>

          <SliderBox
            images={aboutImages[i].img}
            dotColor='#d8b310'
            inactiveDotColor='#e5e5e5'
            imageLoadingColor='white'
          />
        </View>
      ))}
    </WrapperScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: 'comix',
    color: '#d9b310',
  },
  abouttext: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'heebo',
    fontSize: 16,
  },

  image: {
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    height: 200,

    borderColor: 'black',
  },
  textimage: {
    marginTop: 20,
    width: '100%',
    alignSelf: 'center',
    borderBottomColor: '#d9b310',

    color: '#d9b310',
    textAlign: 'center',
    fontFamily: 'comix',
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255,0.1)',
    fontSize: 16,
  },
});

export default AboutScreen;
