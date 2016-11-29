import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Switch,
  TouchableOpacity,
} from 'react-native';

import {
  BASE_PADDING_TOP,
  BASE_PADDING_LEFT,
  BASE_PADDING_RIGHT,
  BASE_FONT_FAMILY_IOS,
} from '../../theme/style';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flex: 1,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
  },
  contentWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: BASE_PADDING_LEFT,
    paddingRight: BASE_PADDING_RIGHT,
    alignItems: 'center',
    paddingTop: BASE_PADDING_TOP,
    paddingBottom: 10,
  },
  textWrapper: {
    flex: 1,
  },
  text: {
    fontFamily: BASE_FONT_FAMILY_IOS,
    fontSize: 16,
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

const getSecondaryText = (props) => {
  if (typeof props.secondaryText !== 'undefined') {
    return (
      <Text
        style={styles.text}
      >
        {props.secondaryText}
      </Text>
    );
  }

  return (
    <View />
  );
};

const getMainJsx = (props) => {
  const secondaryText = getSecondaryText(props);

  const mainView = (
    <View
      style={styles.wrapper}
    >
      <View
        style={styles.contentWrapper}
      >
        <View
          style={styles.textWrapper}
        >
          <Text
            style={styles.text}
          >
            {props.primaryText}
          </Text>
          {secondaryText}
        </View>
        <View
          style={styles.itemWrapper}
        >
          <Switch
            onValueChange={() => props.onValueChanged()}
            value={props.value}
          />
        </View>
      </View>
    </View>
  );

  if (typeof props.onPress !== 'undefined') {
    return (
      <TouchableOpacity
        onPress={() => props.onPress()}
      >
        {mainView}
      </TouchableOpacity>
    );
  }

  return mainView;
};

const OptionItem = props => getMainJsx(props);

OptionItem.propTypes = {
  secondaryText: React.PropTypes.string,
  primaryText: React.PropTypes.string,
  value: React.PropTypes.bool,
};

getSecondaryText.propTypes = { secondaryText: React.PropTypes.string };
getMainJsx.propTypes = {
  primaryText: React.PropTypes.string,
  value: React.PropTypes.bool,
  onPress: React.PropTypes.func,
};

export default OptionItem;
