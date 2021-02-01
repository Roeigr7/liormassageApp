import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Context as AuthContext } from '../context/auth-context';
import { Context as ModalContext } from '../context/modal-context';
import * as Animatable from 'react-native-animatable';
import AnimatedButton from '../customStyles/AnimatedButton';
import { phoneValidator } from '../helpers/ClientValidators';
import { phoneError } from '../../utilities/texts/profile';
const ChangePhoneModal = () => {
  const animationRef = useRef(null);
  const [phone, setPhone] = useState('');
  const { state, updateUser } = useContext(AuthContext);
  const { hideModal } = useContext(ModalContext);
  const [error, setError] = useState(false);

  const phoneHandler = async () => {
    if (animationRef && error) {
      animationRef.current?.swing();
      setError(false);
    }
    if (phoneValidator(phone)) {
      await updateUser(state.userId, state.token, 'phone', phone).then(() => {
        hideModal();
      });
    } else setError(phoneError);
  };

  return (
    <View style={styles.container}>
      <>
        <Text style={styles.text}>בחר מספר טלפון חדש</Text>
        <TextInput
          keyboardType='numeric'
          placeholder='הקש מספר טלפון'
          style={styles.textinput}
          onChangeText={setPhone}
        />
      </>

      {error && (
        <Animatable.Text
          ref={animationRef}
          animation={'swing'}
          easing={'ease-out'}
          duration={700}
          style={[styles.errortext, { color: '#d9b310' }]}
        >
          {error}
        </Animatable.Text>
      )}
      <AnimatedButton
        onPress={phoneHandler}
        buttonStyle={styles.animatedbtn}
        text='אישור'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'heeboBold',
    fontSize: 18,
  },
  textinput: {
    borderRadius: 5,
    padding: 8,
    minWidth: '60%',
    marginVertical: 10,
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  },
  animatedbtn: {
    backgroundColor: '#d9b310',
    color: 'white',
    minWidth: '40%',
    marginVertical: 5,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 20,
  },
  errortext: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    color: 'white',
    fontFamily: 'heebo',
  },
});

export default ChangePhoneModal;
