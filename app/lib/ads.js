import { Platform } from 'react-native';

import { AdMobInterstitial } from 'react-native-admob';

import { PRO_ENABLED } from './constants';

const INTERSTITIAL_AD_UNIT_ID_IOS = 'ca-app-pub-6787064558849209/5649878717';
const BANNER_AD_UNIT_ID_IOS = 'ca-app-pub-6787064558849209/2637536714';
const INTERSTITIAL_AD_UNIT_ID_ANDROID = 'ca-app-pub-6787064558849209/9095331914';
const BANNER_AD_UNIT_ID_ANDROID = 'ca-app-pub-6787064558849209/7618598713';

const getInterstitialUnitId = () => {
  if (Platform.OS === 'ios') {
    return INTERSTITIAL_AD_UNIT_ID_IOS;
  }

  return INTERSTITIAL_AD_UNIT_ID_ANDROID;
};

export const getBannerUnitId = () => {
  if (Platform.OS === 'ios') {
    return BANNER_AD_UNIT_ID_IOS;
  }

  return BANNER_AD_UNIT_ID_ANDROID;
};

const INTERSTITIAL_AD_UNIT_ID = getInterstitialUnitId();
export const BANNER_AD_UNIT_ID = getBannerUnitId();

export const TEST_DEVICE_ID = 'EMULATOR';

export const isProEnabled = mode => mode === PRO_ENABLED;

export const displayInterstitial = () => {
  AdMobInterstitial.setAdUnitID(INTERSTITIAL_AD_UNIT_ID);
  AdMobInterstitial.setTestDeviceID(TEST_DEVICE_ID);
  AdMobInterstitial.addEventListener('interstitialDidLoad',
    () => AdMobInterstitial.showAd());

  AdMobInterstitial.requestAd();
};

