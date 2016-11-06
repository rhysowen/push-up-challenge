import React from 'react';
import { ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Row from '../shared/Row';
import {
  COLOR_ORANGE,
  ICON_SIZE,
} from '../../theme/style';
import ListBaseScreen from '../../theme/ListBaseScreen';
import upgrade from '../../lib/upgrade';

const UPGRADE_TO_PRO = 'Upgrade to Pro';
const RESTORE_PURCHASES = 'Restore Purchases';
const NOTIFICATIONS = 'Notifications';
const SOUNDS = 'Sounds';
const MEDICAL_INFORMATION = 'Medical Information';
const CREDITS = 'Credits';
const RATE_APP = 'Rate App';
const SHARE_APP = 'Share App';
const RESET_APP = 'Reset App';

const onPress = (props, title, key) => {
  const isKeyValid = typeof key !== 'undefined';
  if (isKeyValid) {
    props.navigatePush(key);
  } else {
    switch (title) {
      case UPGRADE_TO_PRO:
        upgrade(props);

        break;
      default:
        break;
    }
  }
};

const options = [
  {
    title: UPGRADE_TO_PRO,
    icon: 'ios-card',
  },
  {
    title: RESTORE_PURCHASES,
    icon: 'ios-cloud-download',
  },
  {
    title: NOTIFICATIONS,
    icon: 'ios-notifications',
    key: 'NotificationContainer',
  },
  {
    title: SOUNDS,
    icon: 'ios-volume-up',
    key: 'SoundContainer',
  },
  {
    title: MEDICAL_INFORMATION,
    icon: 'ios-medical',
    key: 'MedicalInformationContainer',
  },
  {
    title: CREDITS,
    icon: 'ios-people',
    key: 'CreditContainer',
  },
  {
    title: RATE_APP,
    icon: 'ios-star',
  },
  {
    title: SHARE_APP,
    icon: 'ios-share-alt',
  },
  {
    title: RESET_APP,
    icon: 'ios-warning',
  },
];

const ICON_PADDING = 5;
const ICON_STYLE = { width: ICON_SIZE + ICON_PADDING };

const renderVectorJsx = icon => (
  <Icon
    name={icon}
    size={ICON_SIZE}
    color={COLOR_ORANGE}
    style={ICON_STYLE}
  />
);

const renderRow = (option, key, props) => {
  const vectorJsx = renderVectorJsx(option.icon);

  return (
    <Row
      key={key}
      onPress={() => onPress(props, option.title, option.key)}
      titleText={option.title}
      vectorJsx={vectorJsx}
    />
  );
};

const MoreScreen = (props) => {
  const optionsJsx = options.map((o, key) => renderRow(o, key, props));

  return (
    <ListBaseScreen>
      <ScrollView>
        {optionsJsx}
      </ScrollView>
    </ListBaseScreen>
  );
};

export default MoreScreen;
