import { AdMobInterstitial } from 'react-native-admob';

export const INTERSTITIAL_AD_UNIT_ID = 'ca-app-pub-6787064558849209/5649878717';
export const BANNER_AD_UNIT_ID = 'ca-app-pub-6787064558849209/2637536714';
export const TEST_DEVICE_ID = 'EMULATOR';
export const SMART_BANNER_HEIGHT = 50;

export const displayInterstitial = () => {
  AdMobInterstitial.setAdUnitID(INTERSTITIAL_AD_UNIT_ID);
  AdMobInterstitial.setTestDeviceID(TEST_DEVICE_ID);
  AdMobInterstitial.addEventListener('interstitialDidLoad',
    () => AdMobInterstitial.showAd());

  AdMobInterstitial.requestAd();
};

