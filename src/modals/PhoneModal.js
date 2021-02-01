import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Context as AuthContext } from '../context/auth-context';
import Modal from 'react-native-modal';

import AnimatedButton from '../customStyles/AnimatedButton';
import { phoneValidator } from '../helpers/ClientValidators';
import * as RootNavigator from '../navigators/RootNavigator';
const PhoneModal = () => {
  const [visible, setVisible] = useState(true);
  const [phone, setPhone] = useState('');
  const { state, updateUser } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const phoneHandler = () => {
    phoneValidator(phone)
      ? updateUser(state.userId, state.token, 'phone', phone)
      : setError(true);
  };
  const closeModal = () => {
    setVisible(false);
    RootNavigator.navigate('Main');
  };
  return (
    <View style={styles.containerbg}>
      <Modal
        animationInTiming={500}
        backdropOpacity={0.5}
        onBackdropPress={closeModal}
        isVisible={visible}
        animationIn='bounceIn'
        animationOut='fadeOutDown'
      >
        <View style={styles.container}>
          <Text style={styles.text}>לא קיים מספר טלפון במערכת</Text>
          <Text style={styles.text}>יש להוסיף מספר טלפון כדי לקבוע תור</Text>
          <TextInput
            keyboardType='numeric'
            placeholder='הקש מספר טלפון'
            style={[styles.textinput]}
            onChangeText={setPhone}
          />
          {error && (
            <Text style={styles.errortext}>
              נא להקיש מספר טלפון בעל 10 ספרות {'\n'} שמתחיל בספרה 0
            </Text>
          )}
          <AnimatedButton
            onPress={phoneHandler}
            buttonStyle={styles.animatedbtn}
            text='אישור'
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  containerbg: {
    flex: 1,
    backgroundColor: '#328cc1',
  },
  container: {
    borderColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: 'dotted',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d2731',
  },
  text: {
    marginVertical: 5,
    color: 'white',
    fontFamily: 'heeboBold',
    fontSize: 16,
  },
  errortext: {
    textAlign: 'center',
    marginTop: 8,
    color: 'white',
    fontFamily: 'heebo',
    fontSize: 14,
  },
  textinput: {
    backgroundColor: '#FFCF40',
    width: '80%',
    height: 40,
    borderRadius: 5,
    padding: 10,
    margin: 5,
    marginTop: 10,
    marginVertical: 0,

    textAlign: 'center',
    width: '60%',
    backgroundColor: '#f0f0f0',
  },
  animatedbtn: {
    backgroundColor: '#d9b310',
    color: 'white',
    minWidth: '40%',
    marginVertical: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
});

export default PhoneModal;
