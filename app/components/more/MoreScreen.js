import React from 'react';
import {
  ScrollView,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import Row from '../shared/Row';
import {
  COLOR_ORANGE,
  ICON_SIZE,
} from '../../theme/style';
import ListBaseScreen from '../../theme/ListBaseScreen';
import {
  upgrade,
  restorePurchases,
  isProEnabled,
} from '../../lib/util';
import openUrl from '../../lib/linking';
import moreAsyncInitialState from '../../lib/initialState';

const UPGRADE_TO_PRO = 'Upgrade to Pro';
const RESTORE_PURCHASES = 'Restore Purchases';
const NOTIFICATIONS = 'Notifications';
const SOUNDS = 'Sounds';
const MEDICAL_INFORMATION = 'Medical Information';
const CREDITS = 'Credits';
const RATE_APP = 'Rate App';
const RESET_APP = 'Reset App';

const APP_ID = '1173126612';
const RATE_APP_URL = `http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?id=${APP_ID}&pageNumber=0&sortOrdering=2&type=Purple+Software&mt=8`;

const onResetPress = (props) => {
  props.removeSelectedProgramAsync();
  props.removeExerciseStateAsync();

  props.setMoreAsync(moreAsyncInitialState);
  // props.setStatisticsAsync(moreAsyncInitialState);
};

const resetApp = (props) => {
  Alert.alert(
    'Reset App',
    'This will delete all saved data & settings, returning them to factory defaults.',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Reset App',
        onPress: () => onResetPress(props),
        style: 'destructive',
      },
    ]
  );
};

const onPress = (props, title, key) => {
  const isKeyValid = typeof key !== 'undefined';
  if (isKeyValid) {
    props.navigatePush(key);
  } else {
    switch (title) {
      case UPGRADE_TO_PRO:
        upgrade(props);

        break;
      case RESTORE_PURCHASES:
        restorePurchases(props);

        break;
      case RATE_APP:
        openUrl(RATE_APP_URL);

        break;
      case RESET_APP:
        resetApp(props);

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
  const { util } = props;

  const proEnabled = isProEnabled(util.proMode);
  const optionsJsx = options
  .filter((option) => {
    if (proEnabled) {
      return option.title !== UPGRADE_TO_PRO;
    }

    return true;
  })
  .map((o, key) => renderRow(o, key, props));

  return (
    <ListBaseScreen>
      <ScrollView>
        {optionsJsx}
      </ScrollView>
    </ListBaseScreen>
  );
};

export default MoreScreen;
