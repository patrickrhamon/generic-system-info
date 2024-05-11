const si = require('systeminformation');

export class Memory {
    total: number;
    used: number;
    free: number;
  
    constructor() {
      this.total = 0;
      this.used = 0;
      this.free = 0;
    }

    async updateMemoryInfo() {
        try {
          const data = await si.mem();
          this.total = data.total;
          this.used = data.used;
          this.free = data.free;
        } catch (error) {
          console.error('Erro ao atualizar dados de memória:', error);
        }
      }
}