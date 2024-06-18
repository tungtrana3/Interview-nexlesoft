import React, { useState, useEffect, useCallback } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Platform,
  TouchableOpacity,
  Linking,
  Image,
  ImageBackground,
} from 'react-native';
import { COLOR, IMAGE, STRING } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LinearGradient from 'react-native-linear-gradient';
import { Status } from '../../models';
import {
  logOutAction,
  loginAction,
} from '../../redux/reducer/user.reducer';
import { MainRoutes } from '../../routes/routes';
import { MainNavigationProp } from '../../routes/type';
import { TextFieldForm } from '../../components/textField/TextFieldForm';
import { stringIsEmpty } from '../../constants/Function';
import Loading from '../../components/common/Loading';
import { textStyles } from '../../styles';


const Login = ({ navigation }: MainNavigationProp) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.userReducer.status);
  const message = useAppSelector(state => state.userReducer.message);
  const loginData = useAppSelector(state => state.userReducer.loginData);

  const [checkedAge, setCheckedAge] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errUsername, setErrUsername] = useState('');
  const [errPwd, setErrPwd] = useState('');

  const [isRememberPwd, setIsRememberPwd] = useState(true);

  const onChangeUsername = (value: string) => {
    if (value.length > 0 && errUsername.length > 0) {
      setErrUsername('');
    }
    setUsername(value);
  };

  const onChangePassword = (value: string) => {
    if (value.length > 0 && errPwd.length > 0) {
      setErrPwd('');
    }
    setPassword(value);
  };

  const onPressLogin = () => {
    let isValid = _onValidate();
    if (isValid) {
      dispatch(
        loginAction({
          username,
          password
        }),
      );
    }
  };

  const _onValidate = () => {
    let isValid = true;
    if (username.length === 0) {
      setErrUsername(`${STRING.username} ${STRING.valid.notBeBlank}`);
      isValid = false;
    }
    if (password.length === 0) {
      setErrPwd(`${STRING.password} ${STRING.valid.notBeBlank}`);
      isValid = false;
    }
    return isValid;
  };

  useEffect(() => {
    if (status === Status.success) {
      // dispatch(setSnackBarMessage('Đăng nhập thành công', 'success'));
    }
    if (status === Status.error && message !== '') {
      Alert.alert(STRING.popup.error, message, [
        {
          text: 'Ok',
          onPress: () => {
            dispatch(logOutAction());
          },
        },
      ]);
    }
  }, [
    status,
    message,
    navigation,
    isRememberPwd,
    dispatch,
    username,
    password,
    loginData,
  ]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
        style={[styles.container, { backgroundColor: 'black' }]}>
        <Image source={IMAGE.bg_login} style={styles.background} />
        <LinearGradient
          colors={['rgba(0, 0, 0,0)', 'rgba(0, 0, 0,0.7)', 'rgba(0, 0, 0, 1)']}
          style={styles.linearGradient}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps={'handled'}>
            <View style={styles.form}>
              <Text style={[textStyles.mediumBold, { color: 'white', fontSize: 22, lineHeight: 26 }]}>Let’s get you started!</Text>
              <View style={{ marginTop: 40 }}>
                <TextFieldForm
                  label={STRING.yourEmail}
                  value={username}
                  onChangeText={onChangeUsername}
                />
                <TextFieldForm
                  label={STRING.password}
                  value={password}
                  onChangeText={onChangePassword}
                />
              </View>
              <View style={styles.signUp}>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => { setCheckedAge(!checkedAge) }}>
                  <Image
                    style={styles.ic_checkbox}
                    source={
                      checkedAge
                        ? IMAGE.ic_checkbox_checked
                        : IMAGE.ic_checkbox
                    }
                  />
                </TouchableOpacity>
                <Text style={[textStyles.normal, { color: 'white' }]}>I am over 16 years of age</Text>
              </View>
              <Text style={[textStyles.normal, { color: 'white' }]}>
                By clicking Sign Up, you are indicating that you have read and agree to the
                <TouchableOpacity><Text style={[textStyles.normal, { color: COLOR.primary }]}> Terms of Service </Text></TouchableOpacity>
                and
                <TouchableOpacity><Text style={[textStyles.normal, { color: COLOR.primary }]}> Privacy Policy</Text></TouchableOpacity>
              </Text>
              <View style={styles.signUp}>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}>
                  <Text style={[textStyles.normal, { color: 'white' }]}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}>
                  <Text style={[textStyles.normal, { color: 'white' }]}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </LinearGradient>

        {/* </ImageBackground> */}
      </KeyboardAvoidingView>
      {status === Status.loading && <Loading />}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'black'
  },
  background: {
    resizeMode: 'cover',
    top: 0,
    width: '100%',
    height: Dimensions.get('screen').height * 0.5,
    position: 'absolute'
  },
  linearGradient: {
    flex: 1,
    borderRadius: 5
  },
  form: {
    alignSelf: 'center',
    paddingHorizontal: 24,
    width: '100%',
  },
  rmb_pwd_btn: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
  },
  login_btn: {
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: 'red',
  },
  version: {
    bottom: 24,
    position: 'absolute',
    alignSelf: 'center',
  },
  signUp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpLabel: {
    color: 'white'
  },
  ic_checkbox: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 12,
  },
});
