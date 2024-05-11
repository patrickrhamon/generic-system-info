window.addEventListener('DOMContentLoaded', () => {
    const cpuInfo = document.querySelector('.cpu');
    const gpuInfo = document.querySelector('.gpu');
    const ramInfo = document.querySelector('.ram');

    // Dados do CPU
    cpuInfo.innerHTML = `<p>Modelo: processador</p>`;

    // Dados da Placa de Vídeo
    gpuInfo.innerHTML = `<p>Modelo: video</p>`;

    // Dados da Memória RAM
    ramInfo.innerHTML = `<p>Total: RAM GB</p>`;
});
