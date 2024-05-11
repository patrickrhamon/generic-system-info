const { ipcRenderer } = require('electron');

function getUsedMemory(total, free) {
    return ((total - free) / Math.pow(1024, 3)).toFixed(1) + ' GB';
}

ipcRenderer.on('set-cpu', function (event, data) {
    document.getElementById('cpu').innerHTML = data.cpu.model.replace(/\s+/g, ' ').trim();
    document.getElementById('clock').innerHTML = (data.cpu.speed / 1000).toFixed(2) + ' GHz';
    document.getElementById('thread').innerHTML = data.cpusLength;
    document.getElementById('memory').innerHTML = innerHTML = getUsedMemory(data.totalMemory.reference, data.freeMemory.reference) +' / '+ data.totalMemory.giga;
    document.getElementById('memoryFree'). innerHTML = data.freeMemory.giga;
});
