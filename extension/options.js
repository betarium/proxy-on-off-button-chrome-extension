"use strict";

document.addEventListener("DOMContentLoaded", async () => {
    let data = await getProxySettings();

    document.getElementById("proxyEnable").checked = data.proxyEnable ?? true;
    document.getElementById("proxyHost").value = data.proxyHost ?? "";
    document.getElementById("proxyPort").value = (data.proxyPort ? parseInt(data.proxyPort) : "");
    document.getElementById("proxyPacScriptUrl").value = data.proxyPacScriptUrl ?? "";

    let proxyModeList = document.getElementById("proxyMode").children;
    let selectedMode = Array.from(proxyModeList).find(p => p.value === data.proxyMode);
    if (selectedMode) {
        selectedMode.selected = true;
    }

    document.getElementById("proxyEnable").addEventListener("change", (e) => {
        chrome.storage.local.set({ proxyEnable: e.target.checked });
    });

    document.getElementById("proxyMode").addEventListener("change", (e) => {
        chrome.storage.local.set({ proxyMode: e.target.value });
    });

    document.getElementById("proxyHost").addEventListener("change", (e) => {
        chrome.storage.local.set({ proxyHost: e.target.value });
    });

    document.getElementById("proxyPort").addEventListener("change", (e) => {
        chrome.storage.local.set({ proxyPort: e.target.value });
    });

    document.getElementById("proxyPacScriptUrl").addEventListener("change", (e) => {
        chrome.storage.local.set({ proxyPacScriptUrl: e.target.value });
    });

    document.getElementById("saveButton").addEventListener("click", async () => {
        await setProxySettingsFixedServer();
        alert("Save complete!!");
    });
});
