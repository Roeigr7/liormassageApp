import React, { useState, useContext, useRef, useEffect } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as AuthContext } from '../context/auth-context';
import AnimatedButton from '../customStyles/AnimatedButton';

const AuthForm = ({ headerText, loginPage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const { localSign, state, clearErrors } = useContext(AuthContext);
  const refEmail = useRef();
  const refPass = useRef();
  const refPassTwo = useRef();
  const refPhone = useRef();
  const error = state.message.type === 'error' ? true : false;
  const submitPageHandler = () => {
    loginPage ? null : refPassTwo.current.focus();
  };
  const signHandler = (signType) => {
    signType({ loginPage, name, email, phone, password, confirmPass });
  };
  useEffect(() => {
    clearErrors();
  }, []);

  return (
    <>
      <Text style={styles.header}>{headerText}</Text>
      {loginPage ? null : (
        <TextInput
          returnKeyType={'next'}
          blurOnSubmit={false}
          selectionColor={'black'}
          autoCapitalize={'words'}
          value={name}
          color={'#1d2731'}
          backgroundColor={'blue'}
          onChangeText={setName}
          placeholder='שם מלא'
          placeholderTextColor='rgba(11, 60, 93,0.4)'
          style={styles.textinput}
          onSubmitEditing={() => refEmail.current.focus()}
        />
      )}
      <TextInput
        keyboardType='email-address'
        ref={refEmail}
        onSubmitEditing={
          loginPage
            ? () => refPass.current.focus()
            : () => refPhone.current.focus()
        }
        blurOnSubmit={false}
        returnKeyType={'next'}
        selectionColor={'black'}
        color={'#1d2731'}
        autoCapitalize={'none'}
        value={email}
        onChangeText={setEmail}
        placeholder='אימייל'
        placeholderTextColor='rgba(11, 60, 93,0.4)'
        style={styles.textinput}
      />
      {!loginPage && (
        <TextInput
          ref={refPhone}
          keyboardType='numeric'
          onSubmitEditing={() => refPass.current.focus()}
          blurOnSubmit={false}
          returnKeyType={'next'}
          selectionColor={'black'}
          color={'#1d2731'}
          autoCapitalize={'none'}
          value={phone}
          onChangeText={setPhone}
          placeholder='טלפון'
          placeholderTextColor='rgba(11, 60, 93,0.4)'
          style={styles.textinput}
        />
      )}
      <TextInput
        ref={refPass}
        onSubmitEditing={submitPageHandler}
        blurOnSubmit={loginPage ? true : false}
        returnKeyType={loginPage ? 'done' : 'next'}
        selectionColor={'black'}
        color={'#1d2731'}
        autoCompleteType={'password'}
        autoCapitalize={'none'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder='הכנס סיסמא'
        placeholderTextColor='rgba(11, 60, 93,0.4)'
        style={styles.textinput}
      />
      {!loginPage && (
        <TextInput
          blurOnSubmit={true}
          ref={refPassTwo}
          selectionColor={'black'}
          color={'#1d2731'}
          autoCompleteType={'password'}
          autoCapitalize={'none'}
          secureTextEntry
          autoCorrect={true}
          value={confirmPass}
          onChangeText={setConfirmPass}
          placeholder='הכנס סיסמא בשנית לאישור'
          placeholderTextColor='rgba(11, 60, 93,0.4)'
          style={styles.textinput}
        />
      )}

      {error ? (
        <Text style={styles.message}>
          <Text style={styles.problem}> שגיאה: </Text> {state.message.content}
        </Text>
      ) : null}

      <AnimatedButton
        onPress={() => signHandler(localSign)}
        text={loginPage ? 'התחבר' : 'הירשם'}
        textStyle={styles.localText}
        buttonStyle={[styles.localbtn, { backgroundColor: '#d9b310' }]}
      />
      <Text style={styles.ortext}>או</Text>
      <View style={styles.socialbuttoncontainer}>
        {/* ///////////////////////////////FACEBOOK///////////////////////////////// */}
        <AnimatedButton
          text={'בקרוב'}
          disable={true}
          icon={'facebook'}
          textStyle={styles.socialText}
          buttonStyle={[styles.socialbtn, { backgroundColor: '#4267B2' }]}
        />
        {/* ///////////////////////////////GOOGLE///////////////////////////////// */}
        <AnimatedButton
          text={'בקרוב'}
          disable={true}
          icon={'google'}
          textStyle={styles.socialText}
          buttonStyle={[styles.socialbtn, { backgroundColor: '#DB4437' }]}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    marginVertical: 8,
    color: '#d9b310',
    fontFamily: 'comix',
    textAlign: 'center',
  },
  textinput: {
    fontSize: 16,
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#f5f5f5',
    alignSelf: 'center',
  },
  localbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.8,
    padding: 10,
    elevation: 1,
    margin: 5,
    borderRadius: 10,
  },

  socialText: {
    fontSize: 16,
    color: 'white',
  },
  localText: {
    fontSize: 16,
    color: 'white',
  },
  socialbuttoncontainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  socialbtn: {
    opacity: 0.5,
    backgroundColor: '#051926',
    justifyContent: 'center',
    borderRadius: 30,
    elevation: 1,
    minWidth: 150,
    height: 50,
    padding: 10,
    margin: 5,
    alignSelf: 'center',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  problem: {
    color: 'red',
    fontSize: 16,
  },
  ortext: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'heeboBold',
    color: 'white',
  },
  forgotpasstext: {
    textAlign: 'left',
    padding: 5,
    fontSize: 14,
    color: 'white',
  },
});

export default AuthForm;
