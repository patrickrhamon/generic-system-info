const { ipcRenderer } = require('electron');

ipcRenderer.on('set-velocity', function (event, data) {
    console.log(data);
    document.getElementById('download').innerHTML = data.download + 'Mbps';
    document.getElementById('upload').innerHTML = data.upload + 'Mbps';
}); 