import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextInput,
  KeyboardTypeOptions,
  Platform,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { textStyles, viewStyles } from '../../styles';
import { COLOR, IMAGE, STRING } from '../../constants';
import { stringIsEmpty } from '../../constants/Function';

interface TextFieldFormProps {
  label?: string;
  value?: any;
  duration?: number,
  onChangeText?: (text: string) => void;
}
export const TextFieldForm = ({
  value,
  label,
  duration = 300,
  onChangeText,
}: TextFieldFormProps) => {
  const [text, setText] = useState<string>(value);
  const [isShowPwd, setShowPwd] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);


  useEffect(() => {
    setText(value);
  }, [value]);
  const transY = useRef(new Animated.Value(0));
  const handleFocus = () => {
    Animated.timing(transY.current, {
      toValue: -30,
      duration,
      useNativeDriver: true
    }).start()
  }
  const handleBlur = () => {
    if (stringIsEmpty(text)) {
      Animated.timing(transY.current, {
        toValue: 0,
        duration,
        easing: Easing.ease,
        useNativeDriver: true
      }).start()
    }
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.lableContainer, { transform: [{ translateY: transY.current }] }]}>
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
      <TextInput onChangeText={(text) => setText(text)} value={text} style={styles.input} onBlur={handleBlur} onFocus={handleFocus}>
      </TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.primary
  },
  input: {
    paddingVertical: 12,
    color: 'white'
  },
  lableContainer: {
    position: 'absolute',
  },
  label: {
    color: 'white',
    opacity: 0.5
  }
});
