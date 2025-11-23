// MVP 2: Monster tracking functionality (UI-focused, in-memory)

export class MonsterTracker {
  constructor() {
    this.monsters = [];  // In-memory storage (replace with DB later)
    this.editingId = null;  // Track which monster is being edited
    this.init();
  }

  init() {
    const addBtn = document.getElementById('add-monster-btn');
    addBtn.addEventListener('click', () => this.addMonster());
  }

  addMonster() {
    const name = document.getElementById('monster-name').value.trim();
    const hp = Number(document.getElementById('monster-hp').value);
    const ac = Number(document.getElementById('monster-ac').value);
    const initiative = Number(document.getElementById('monster-initiative').value);
    const notes = document.getElementById('monster-notes').value.trim();

    if (!name || !hp || !ac) {
      alert('Name, HP, and AC are required!');
      return;
    }

    const monster = { id: Date.now(), name, hp, ac, initiative, notes };
    this.monsters.push(monster);
    this.renderMonsters();
    this.clearForm();
  }

  renderMonsters() {
    const list = document.getElementById('monster-list');
    list.innerHTML = '';
    this.monsters.forEach(monster => {
      const card = document.createElement('div');
      card.className = 'monster-card';
      if (this.editingId === monster.id) {
        // Edit mode: Show inputs with labels
        card.innerHTML = `
          <label for="edit-name-${monster.id}">Name:</label><br>
          <input type="text" id="edit-name-${monster.id}" value="${monster.name}" required><br>
          <label for="edit-hp-${monster.id}">HP:</label><br>
          <input type="number" id="edit-hp-${monster.id}" value="${monster.hp}" required><br>
          <label for="edit-ac-${monster.id}">AC:</label><br>
          <input type="number" id="edit-ac-${monster.id}" value="${monster.ac}" required><br>
          <label for="edit-initiative-${monster.id}">Initiative:</label><br>
          <input type="number" id="edit-initiative-${monster.id}" value="${monster.initiative}" required><br>
          <label for="edit-notes-${monster.id}">Notes:</label><br>
          <textarea id="edit-notes-${monster.id}">${monster.notes}</textarea><br>
          <button class="save-btn" data-id="${monster.id}">Save</button>
          <button class="cancel-btn" data-id="${monster.id}">Cancel</button>
         `;   
      } else {
        // Display mode: Show data
        card.innerHTML = `
          <h3>${monster.name}</h3>
          <p>HP: ${monster.hp} | AC: ${monster.ac} | Initiative: ${monster.initiative}</p>
          <p>Notes: ${monster.notes || 'None'}</p>
          <button class="edit-btn" data-id="${monster.id}">Edit</button>
          <button class="delete-btn" data-id="${monster.id}">Delete</button>
        `;
      }
      list.appendChild(card);
    });

    // Add event listeners
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.startEdit(e.target.dataset.id));
    });
    document.querySelectorAll('.save-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.saveEdit(e.target.dataset.id));
    });
    document.querySelectorAll('.cancel-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.cancelEdit());
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.deleteMonster(e.target.dataset.id));
    });
  }

  startEdit(id) {
    this.editingId = Number(id);
    this.renderMonsters();
  }

  saveEdit(id) {
    const monster = this.monsters.find(m => m.id == id);
    if (!monster) return;

    const newName = document.getElementById(`edit-name-${id}`).value.trim();
    const newHp = Number(document.getElementById(`edit-hp-${id}`).value);
    const newAc = Number(document.getElementById(`edit-ac-${id}`).value);
    const newInitiative = Number(document.getElementById(`edit-initiative-${id}`).value);
    const newNotes = document.getElementById(`edit-notes-${id}`).value.trim();

    if (!newName || !newHp || !newAc) {
      alert('Name, HP, and AC are required!');
      return;
    }

    monster.name = newName;
    monster.hp = newHp;
    monster.ac = newAc;
    monster.initiative = newInitiative;
    monster.notes = newNotes;

    this.editingId = null;
    this.renderMonsters();
  }

  cancelEdit() {
    this.editingId = null;
    this.renderMonsters();
  }

  deleteMonster(id) {
    this.monsters = this.monsters.filter(m => m.id != id);
    this.renderMonsters();
  }

  clearForm() {
    document.getElementById('monster-name').value = '';
    document.getElementById('monster-hp').value = '';
    document.getElementById('monster-ac').value = '';
    document.getElementById('monster-hp').value = '';
    document.getElementById('monster-ac').value = '';
    document.getElementById('monster-initiative').value = '';
    document.getElementById('monster-notes').value = '';
  }
}