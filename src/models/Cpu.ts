const si = require('systeminformation');

export class CPU {
  manufacturer: string;
  speed: number;
  threads: number;
  cores: number;
  virtualization: boolean;

  constructor() {
    this.manufacturer = '';
    this.speed = 0;
    this.threads = 0;
    this.cores = 0;
    this.virtualization = false;
  }

  async updateCPUInfo() {
    try {
      const data = await si.cpu();
      this.manufacturer = data.manufacturer;
      this.speed = data.speed;
      this.threads = data.cores;
      this.cores = data.physicalCores;
      this.virtualization = data.virtualization;
    } catch (error) {
      console.error('Erro ao atualizar dados da CPU:', error);
    }
  }
}