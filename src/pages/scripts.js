const { ipcRenderer } = require('electron');

function getUsedMemory(total, free) {
    // return ((total - free) / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
    // return ((total - free) / 1024 / 1024 / 1024).toFixed(1) + ' GB';
    return ((total - free) / Math.pow(1024, 3)).toFixed(1) + ' GB';
}

function getFullHour(value) {
    var data = new Date(value);
    let hour = data.getHours() < 10 ? '0'+data.getHours() : data.getHours(); 
    let minute = data.getMinutes() < 10 ? '0'+data.getMinutes() : data.getMinutes(); 
    let second = data.getSeconds() < 10 ? '0'+data.getSeconds() : data.getSeconds();
    
    return `${hour}:${minute}:${second}`;
}

ipcRenderer.on('set-cpu', function (event, data) {
    document.getElementById('cpu').innerHTML = data.cpu.model.replace(/\s+/g, ' ').trim();
    document.getElementById('clock').innerHTML = (data.cpu.speed / 1000).toFixed(2) + ' GHz';
    document.getElementById('thread').innerHTML = data.cpusLength;
    document.getElementById('memory').innerHTML = innerHTML = getUsedMemory(data.totalMemory.reference, data.freeMemory.reference) +' / '+ data.totalMemory.giga;
    document.getElementById('memoryFree'). innerHTML = data.freeMemory.giga;
});

ipcRenderer.on('set-velocity', function (event, data) {
    document.getElementById('download').innerHTML = data.download + ' Mbps';
    document.getElementById('upload').innerHTML = data.upload + ' Mbps';
});

ipcRenderer.on('set-history', function (event, data) {
    document.getElementById('mediaDownload').innerHTML = data.mediaDownload + ' Mbps';
    document.getElementById('mediaUpload').innerHTML = data.mediaUpload + ' Mbps';

    var labels = [];
    var download = [];
    var upload = [];

    for (var item of data.items) {
        labels.unshift(getFullHour(item.data));
        download.unshift(item.download);
        upload.unshift(item.upload);
    }

    var dados = {
        labels: labels,
        datasets: [
            {
                label: "Download",
                data: download,
                fillColor: "rgba(0,0,0,0.0)",
                borderColor: "rgba(85, 245, 71, 0.836)",
                pointColor: "rgba(85, 245, 71, 0.836)",
                color: "rgba(240, 248, 255, 0.767)"
            },
            {
                label: "Upload",
                data: upload,
                fillColor: "rgba(0,0,0,0.0)",
                borderColor: "rgba(240, 21, 21, 0.884)",
                pointColor: "rgba(240, 21, 21, 0.884)",
                color: "rgba(240, 248, 255, 0.767)"
            }
        ]
    };

    let grafico = document.getElementById('grafico').getContext('2d');
    new Chart(grafico).Line(dados);
});
