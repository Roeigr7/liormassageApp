import React, { useEffect, useState, useContext } from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Context as BookingContext } from '../context/booking-context';
import { Context as AuthContext } from '../context/auth-context';
import * as Animatable from 'react-native-animatable';
const AnimatedButton = ({
  iconColor,
  icon,
  text,
  onPress,
  buttonStyle,
  textStyle,
  delay,
  disable,
  duration,
  animation,
  textContainer,
}) => {
  const [localLoading, setLocalLoading] = useState(false);
  const bookingContext = useContext(BookingContext);
  const authContext = useContext(AuthContext);
  const bookingLoading = bookingContext.state.loading;
  const authLoading = authContext.state.loading;
  const loading = bookingLoading || authLoading;

  useEffect(() => {
    if (!loading) setLocalLoading(false);
  }, [loading]);

  const onButtonPress = () => {
    setLocalLoading(true);
    onPress();
  };

  return (
    <Animatable.View
      animation={animation || 'zoomIn'}
      delay={delay || 0}
      duration={duration || 600}
      style={styles.container}
    >
      <TouchableWithoutFeedback
        disabled={disable ? true : false}
        onPress={onButtonPress}
      >
        <Animated.View style={buttonStyle}>
          {loading && localLoading ? (
            <ActivityIndicator size={30} color={'black'} />
          ) : (
            <View style={[styles.textcontainer, textContainer]}>
              {icon ? (
                <Icon
                  color={iconColor || 'white'}
                  size={24}
                  type='font-awesome'
                  name={icon}
                />
              ) : null}
              {text ? (
                <Text style={[styles.txt, textStyle]}>{text}</Text>
              ) : null}
            </View>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'heebo',
    color: '#ffffff',
  },
  textcontainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default AnimatedButton;
