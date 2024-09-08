document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(['proxyHost', 'proxyPort'], function (data) {
        document.getElementById("proxyHost").value = data.proxyHost ?? "";
        document.getElementById("proxyPort").value = (data.proxyPort ? parseInt(data.proxyPort) : "");
    });

    document.getElementById("proxyHost").addEventListener("change", (e) => {
        chrome.storage.sync.set({ proxyHost: e.target.value });
    });

    document.getElementById("proxyPort").addEventListener("change", (e) => {
        chrome.storage.sync.set({ proxyPort: e.target.value });
    });
});
