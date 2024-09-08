async function setProxySettingsFixedServer() {
    let data = await chrome.storage.sync.get(['proxyHost', 'proxyPort']);

    if (!data.proxyHost) {
        throw Error("proxyHost is empty");
    }
    else if (!data.proxyPort) {
        throw Error("proxyPort is empty");
    }

    let proxyPortNum = parseInt(data.proxyPort);

    let config = {
        mode: "fixed_servers",
        rules: {
            singleProxy: {
                host: data.proxyHost,
                port: proxyPortNum
            },
        }
    };

    await chrome.proxy.settings.set({ value: config });
}

async function clearProxySettings() {
    await chrome.proxy.settings.clear({ scope: 'regular' });
}

chrome.action.onClicked.addListener(async () => {
    chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });

    let data = await chrome.storage.session.get('proxyEnable');
    let proxyEnable = !data.proxyEnable;

    if (proxyEnable) {
        await setProxySettingsFixedServer();
    }
    else {
        await clearProxySettings();
    }

    await chrome.storage.session.set({ "proxyEnable": proxyEnable });
});

chrome.tabs.onRemoved.addListener((_tabId, removeInfo) => {
    if (removeInfo.isWindowClosing) {
        clearProxySettings();
    }
});
