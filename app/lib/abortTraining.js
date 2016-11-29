import { Alert } from 'react-native';

export default (props, callback) => {
  const onAbort = () => {
    props.removeProgramAsync();
    props.removeExerciseAsync();

    if (typeof callback === 'function') {
      callback();
    }
  };

  Alert.alert(
    'Confirmation',
    'Are you sure you want to abort training?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Abort',
        onPress: () => onAbort(props),
        style: 'destructive',
      },
    ],
  );
};
