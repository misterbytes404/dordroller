// MVP 2 & 3: Player stat tracking and roll assignment

export class PlayerTracker {
  constructor() {
    this.players = [];
    this.init();
  }

  init() {
    const addBtn = document.getElementById('add-player-btn');
    addBtn.addEventListener('click', () => this.showAddPlayerDialog());
  }

  showAddPlayerDialog() {
    // Implementation pending - will create modal/form to add player
    console.log('Add player dialog - to be implemented in MVP 2');
  }

  renderPlayers() {
    // Implementation pending - will render player cards
  }

  async fetchPlayers() {
    // Implementation pending - will fetch from backend API
  }

  async createPlayer(playerData) {
    // Implementation pending - will POST to backend API
  }

  async updatePlayer(id, updates) {
    // Implementation pending - will PUT to backend API
  }

  async deletePlayer(id) {
    // Implementation pending - will DELETE from backend API
  }

  assignRollToPlayer(playerId, rollRequest) {
    // MVP 3: Assign a roll request to a specific player
    // Implementation pending
  }
}
