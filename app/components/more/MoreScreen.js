import React from 'react';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Row from '../shared/Row';
import {
  COLOR_ORANGE,
  ICON_SIZE,
} from '../../theme/style';

const options = [
  {
    title: 'Notifications',
    icon: 'ios-notifications',
  },
  {
    title: 'Medical Information',
    icon: 'ios-medical',
  },
  {
    title: 'Credits',
    icon: 'ios-people',
  },
  {
    title: 'Upgrade to Pro',
    icon: 'ios-card',
  },
  {
    title: 'Restore Package',
    icon: 'ios-cloud-download',
  },
  {
    title: 'Rate App',
    icon: 'ios-star',
  },
  {
    title: 'Share App',
    icon: 'ios-share-alt',
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

const renderRow = (option, key) => {
  const vectorJsx = renderVectorJsx(option.icon);

  return (
    <Row
      key={key}
      onPress={() => console.log('Todo')}
      titleText={option.title}
      vectorJsx={vectorJsx}
    />
  );
};

const MoreScreen = () => {
  const optionsJsx = options.map((o, key) => renderRow(o, key));

  return (
    <ScrollView>
      {optionsJsx}
    </ScrollView>
  );
};

export default MoreScreen;
