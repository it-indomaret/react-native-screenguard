/* eslint-disable @typescript-eslint/no-unused-vars */
import { NativeModules, NativeEventEmitter } from 'react-native';

import * as ScreenGuardConstants from './constant';
import { ScreenGuardBlurDataObject, ScreenGuardImageDataObject } from './data';

const { ScreenGuard } = NativeModules;

var screenGuardEmitter: NativeEventEmitter | null = null;

export default {
  /**
   * activate screenshot blocking (iOS 13+, Android 5+)
   * @param capturedBackgroundColor background color layout after taking a screenshot
   * @param callback void callback after a screenshot or a video capture has been taken
   * @version v0.0.2+
   */
  register(
    capturedBackgroundColor: String | null,
    callback: (arg: any) => void
  ) {
    let currentColor =
      capturedBackgroundColor == null ||
      capturedBackgroundColor.trim().length === 0 ||
      !capturedBackgroundColor.trim().startsWith('#') ||
      ScreenGuardConstants.REGEX.test(
        capturedBackgroundColor.trim().substring(1)
      )
        ? ScreenGuardConstants.BLACK_COLOR
        : capturedBackgroundColor;
    ScreenGuard.activateShield(currentColor);
    if (screenGuardEmitter == null) {
      screenGuardEmitter = new NativeEventEmitter(ScreenGuard);
    }
    const _callback = (res) => {
      callback(res);
    };
  },

  /**
   * Activate screenshot blocking with a blur effect after captured (iOS 13+, Android 6+)
   * @param data ScreenGuardBlurDataObject data object
   * @param callback void callback after a screenshot or a video capture has been taken
   * @version v1.0.2-beta+
   */
  registerWithBlurView(data: ScreenGuardBlurDataObject, callback) {
    console.warn(
      'Install the beta version to continue. Head over to README.md -> Install -> Beta section for how to install'
    );
  },

  /**
   * activate without blocking screenshot (iOS 10+, Android 5+ )
   * For screenshot detector only, this will fit your need.
   * @param void callback callback after a screenshot or a video screen capture has been taken
   * @version v0.0.6+
   */
  registerWithoutScreenguard(callback: (arg: any) => void) {
    ScreenGuard.activateWithoutShield();
    if (screenGuardEmitter == null) {
      screenGuardEmitter = new NativeEventEmitter(ScreenGuard);
    }
    const _callback = (res) => {
      callback(res);
    };
  },

  /**
   * activate with an Image uri (iOS 13+, Android 8+)
   * @param data ScreenGuardImageDataObject data object,
   * @param callback void callback after a screenshot or a video screen capture has been taken
   * @version v1.0.2-beta+
   */
  registerWithImage(
    data: ScreenGuardImageDataObject,
    callback: (arg: any) => void
  ) {
    console.warn(
      'Install the beta version to continue. Head over to README.md -> Install -> Beta section for how to install'
    );
  },

  /**
   * Deactivate screenguard
   * Clear all screen protector and event listening
   * @version v0.0.2+
   */
  unregister() {
    // screenGuardEmitter.removeListener(EVENT_NAME);
    ScreenGuard.deactivateShield();
  },
};
