import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Content from '../shared/Content';
import {
  CONTEXT_TEXT_STYLE,
  COLOR_ORANGE,
} from '../../theme/style';
import {
  APP_NAME,
  APP_VERSION,
  APP_AUTHOR,
} from '../../lib/constants';
import openUrl from '../../lib/linking';

const styles = StyleSheet.create({
  iconAuthorWrapper: { flexDirection: 'row' },
  iconCreditsWrapper: { flexDirection: 'row' },
  touchableColor: Object.assign(
    {},
    CONTEXT_TEXT_STYLE,
    {
      color: COLOR_ORANGE,
    }
  ),

});

const ICON_AUTHORS = [
  {
    name: 'Freepik',
    url: 'http://www.freepik.com',
    type: 'Push-Up',
  },
  {
    name: 'Madebyoliver',
    url: 'http://www.flaticon.com/authors/madebyoliver',
    type: 'List, More & Muscle',
  },
  {
    name: 'Gregor Cresnar',
    url: 'http://www.flaticon.com/authors/gregor-cresnar',
    type: 'Graph',
  },
];

const getTouchableOpacityJsx = (name, url) => (
  <TouchableOpacity
    onPress={() => openUrl(url)}
  >
    <View>
      <Text
        style={styles.touchableColor}
      >
        {name}
      </Text>
    </View>
  </TouchableOpacity>
);

const BY_TEXT = 'icon by ';
const getIconAuthorJsx = (name, type, url, key) => {
  const touchableOpacityJsx = getTouchableOpacityJsx(name, url);

  return (
    <View
      key={key}
      style={styles.iconAuthorWrapper}
    >
      <Text
        style={CONTEXT_TEXT_STYLE}
      >
        {type} {BY_TEXT}
      </Text>
      {touchableOpacityJsx}
    </View>
  );
};

const getIconAuthorMapJsx = () => (
  ICON_AUTHORS.map((author, index) => {
    const {
      name,
      type,
      url,
    } = author;

    return getIconAuthorJsx(name, type, url, index);
  })
);

const APP_CREDITS_HEADER = 'App Credits';
const getAppCreditsContent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Text
      style={CONTEXT_TEXT_STYLE}
    >
      {APP_NAME} {APP_VERSION}. {'\u00A9'} {currentYear} {APP_AUTHOR}. All rights reserved.
    </Text>
  );
};

const ICON_CREDITS_HEADER = 'Icon Credits';
const getIconCreditsContent = () => {
  const authorsMapJsx = getIconAuthorMapJsx();

  const name = 'www.flaticon.com';
  const url = 'http://www.flaticon.com';
  const touchableOpacityJsx = getTouchableOpacityJsx(name, url);

  const allIconsFrom = 'All icons are from ';

  return (
    <View>
      {authorsMapJsx}
      <View style={styles.iconCreditsWrapper}>
        <Text
          style={CONTEXT_TEXT_STYLE}
        >
          {allIconsFrom}
        </Text>
        {touchableOpacityJsx}
      </View>
    </View>
  );
};

export default () => {
  const appCreditsContent = getAppCreditsContent();
  const iconCreditsContent = getIconCreditsContent();

  return (
    <Content>
      <Content.Item
        header={APP_CREDITS_HEADER}
        content={appCreditsContent}
      />
      <Content.Item
        header={ICON_CREDITS_HEADER}
        content={iconCreditsContent}
      />
    </Content>
  );
};
