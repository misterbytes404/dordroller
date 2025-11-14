// MVP 2: Monster stat tracking

export class MonsterTracker {
  constructor() {
    this.monsters = [];
    this.init();
  }

  init() {
    const addBtn = document.getElementById('add-monster-btn');
    addBtn.addEventListener('click', () => this.showAddMonsterDialog());
  }

  showAddMonsterDialog() {
    // Implementation pending - will create modal/form to add monster
    console.log('Add monster dialog - to be implemented in MVP 2');
  }

  renderMonsters() {
    // Implementation pending - will render monster cards
  }

  async fetchMonsters() {
    // Implementation pending - will fetch from backend API
  }

  async createMonster(monsterData) {
    // Implementation pending - will POST to backend API
  }

  async updateMonster(id, updates) {
    // Implementation pending - will PUT to backend API
  }

  async deleteMonster(id) {
    // Implementation pending - will DELETE from backend API
  }
}
