import { OneSignal } from '@ionic-native/onesignal/ngx';
import { ConfigData } from 'src/app/services/config';

function enablePushNotification(oneSignal: OneSignal) {
    this.storage.set('isPushNotificationEnabled', 'true');
    if (oneSignal && ConfigData.oneSignal && ConfigData.oneSignal.appID && ConfigData.oneSignal.googleProjectId) {
        oneSignal.startInit(ConfigData.oneSignal.appID, ConfigData.oneSignal.googleProjectId);
        oneSignal.inFocusDisplaying(oneSignal.OSInFocusDisplayOption.InAppAlert);
        oneSignal.endInit();
    }
}

function disablePushNotification(oneSignal: OneSignal) {
    this.storage.set('isPushNotificationEnabled', 'false');
    if (oneSignal) {
        oneSignal.startInit('', '');
        oneSignal.inFocusDisplaying(oneSignal.OSInFocusDisplayOption.InAppAlert);
        oneSignal.endInit();
    }
}

function initOneSignal(oneSignal: OneSignal) {
    let pushNotificationEnabledStorageValue = this.storage.getItem('isPushNotificationEnabled');
    if (!pushNotificationEnabledStorageValue) {
        this.storage.set('isPushNotificationEnabled', 'true');
        pushNotificationEnabledStorageValue = 'true';
    }

    if (pushNotificationEnabledStorageValue === 'true') {
        enablePushNotification(oneSignal);
    } else {
        disablePushNotification(oneSignal);
    }
}

export const OneSignalConfig = {
    'enablePushNotification': enablePushNotification,
    'disablePushNotification': disablePushNotification,
    'initOneSignal': initOneSignal
};

