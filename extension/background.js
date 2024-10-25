"use strict";

import { } from "./proxy.js";

chrome.runtime.onStartup.addListener(async () => {
    let data = await getProxySettings();

    if (!data.proxyEnable) {
        return;
    }

    setProxySettingsFixedServer();
});

chrome.action.onClicked.addListener(async () => {
    let data = await getProxySettings();

    let proxyEnable = !data.proxyEnable;

    if (proxyEnable) {
        await setProxySettingsFixedServer();
    }
    else {
        await clearProxySettings();
    }

    await chrome.storage.local.set({ "proxyEnable": proxyEnable });
});

chrome.tabs.onRemoved.addListener((_tabId, removeInfo) => {
    if (removeInfo.isWindowClosing) {
        clearProxySettings();
    }
});
