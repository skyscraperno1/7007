import { useContext } from 'react';
import { ResourcesContext } from './ResourcesProvider';

export const useResources = () => {
  return useContext(ResourcesContext);
};

export const usePhoneCal = () => {
  const ua = window.navigator.userAgent;
  const isIphone = /iPhone/.test(ua);
  const isSafari = /Safari/.test(ua) && !/CriOS/.test(ua) && !/FxiOS/.test(ua);
  return isIphone && isSafari;
}
