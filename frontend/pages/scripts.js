const { ipcRenderer } = require('electron');

function getUsedMemory(total, free) {
    return ((total - free) / Math.pow(1024, 3)).toFixed(1) + ' GB';
}

ipcRenderer.on('set-cpu', function (event, data) {
    document.getElementById('cpu').innerHTML = "";
    document.getElementById('clock').innerHTML = "";
    document.getElementById('thread').innerHTML = "";
    document.getElementById('memory').innerHTML = "";
    document.getElementById('memoryFree'). innerHTML = "";
});
