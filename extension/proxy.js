"use strict";

async function getProxySettings() {
    return await chrome.storage.local.get(['proxyEnable', 'proxyMode', 'proxyHost', 'proxyPort', 'proxyPacScriptUrl']);
}

async function setProxySettingsFixedServer() {
    let data = await getProxySettings();

    if (!data.proxyEnable) {
        await clearProxySettings();
        return;
    }

    let config = { mode: "system" };

    let proxyMode = data.proxyMode;
    if (proxyMode === "disable") {
        await clearProxySettings();
        return;
    }
    else if (proxyMode === "system") {
        config = { mode: "system" };
    }
    else if (proxyMode === "direct") {
        config = { mode: "direct" };
    }
    else if (proxyMode === "auto_detect") {
        config = { mode: "auto_detect" };
    }
    else if (proxyMode === "pac_script") {
        config = {
            mode: "pac_script",
            pacScript: {
                url: data.proxyPacScriptUrl
            }
        };
    }
    else if (proxyMode === "fixed_servers") {
        if (data.proxyHost && data.proxyPort) {
            let proxyPortNum = parseInt(data.proxyPort);

            config = {
                mode: "fixed_servers",
                rules: {
                    singleProxy: {
                        host: data.proxyHost,
                        port: proxyPortNum
                    },
                }
            };
        }
    }

    await chrome.proxy.settings.set({ value: config });
}

async function clearProxySettings() {
    await chrome.proxy.settings.clear({ scope: 'regular' });
}

if (typeof exports !== 'undefined') {
    exports = { setProxySettingsFixedServer, clearProxySettings };
}
