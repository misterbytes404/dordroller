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
    const size = document.getElementById('monster-size').value;
    const type = document.getElementById('monster-type').value.trim();
    const alignment = document.getElementById('monster-alignment').value;
    const ac = Number(document.getElementById('monster-ac').value);
    const hp = Number(document.getElementById('monster-hp').value);
    const hpDice = document.getElementById('monster-hp-dice').value.trim();
    const speed = document.getElementById('monster-speed').value.trim();
    const str = Number(document.getElementById('monster-str').value) || 10;
    const dex = Number(document.getElementById('monster-dex').value) || 10;
    const con = Number(document.getElementById('monster-con').value) || 10;
    const int = Number(document.getElementById('monster-int').value) || 10;
    const wis = Number(document.getElementById('monster-wis').value) || 10;
    const cha = Number(document.getElementById('monster-cha').value) || 10;
    const skills = document.getElementById('monster-skills').value.trim();
    const resistances = document.getElementById('monster-resistances').value.trim();
    const immunities = document.getElementById('monster-immunities').value.trim();
    const senses = document.getElementById('monster-senses').value.trim();
    const languages = document.getElementById('monster-languages').value.trim();
    const cr = document.getElementById('monster-cr').value.trim();
    const traits = document.getElementById('monster-traits').value.trim();
    const actions = document.getElementById('monster-actions').value.trim();

    if (!name || !type || !hp || !ac || !speed) {
      alert('Name, Type, HP, AC, and Speed are required!');
      return;
    }

    const monster = {
      id: Date.now(),
      name,
      size,
      type,
      alignment,
      ac,
      hp,
      hpDice,
      speed,
      abilities: { str, dex, con, int, wis, cha },
      skills,
      resistances,
      immunities,
      senses,
      languages,
      cr,
      traits,
      actions
    };
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
        // Edit mode: Show inputs (abbreviated; expand as needed)
        card.innerHTML = `
          <label for="edit-name-${monster.id}">Name:</label><br>
          <input type="text" id="edit-name-${monster.id}" value="${monster.name}" required><br>
          <!-- Add other edit fields here -->
          <button class="save-btn" data-id="${monster.id}">Save</button>
          <button class="cancel-btn" data-id="${monster.id}">Cancel</button>
        `;
      } else {
        // Display mode: Stat block format
        const modStr = this.getModifier(monster.abilities.str);
        const saveStr = this.getSave(monster.abilities.str);
        const modDex = this.getModifier(monster.abilities.dex);
        const saveDex = this.getSave(monster.abilities.dex);
        const modCon = this.getModifier(monster.abilities.con);
        const saveCon = this.getSave(monster.abilities.con);
        const modInt = this.getModifier(monster.abilities.int);
        const saveInt = this.getSave(monster.abilities.int);
        const modWis = this.getModifier(monster.abilities.wis);
        const saveWis = this.getSave(monster.abilities.wis);
        const modCha = this.getModifier(monster.abilities.cha);
        const saveCha = this.getSave(monster.abilities.cha);

        card.innerHTML = `
          <h3>${monster.name}</h3>
          <p><em>${monster.size} ${monster.type}, ${monster.alignment}</em></p>
          <hr>
          <p><strong>AC</strong> ${monster.ac} <strong>Initiative</strong> ${modDex}</p>
          <p><strong>HP</strong> ${monster.hp} ${monster.hpDice ? `(${monster.hpDice})` : ''}</p>
          <p><strong>Speed</strong> ${monster.speed}</p>
          <hr>
          <table class="abilities-table">
            <tr><th>Ability</th><th>Score</th><th>Mod</th><th>Save</th></tr>
            <tr><td>Str</td><td>${monster.abilities.str}</td><td>${modStr}</td><td>${saveStr}</td></tr>
            <tr><td>Dex</td><td>${monster.abilities.dex}</td><td>${modDex}</td><td>${saveDex}</td></tr>
            <tr><td>Con</td><td>${monster.abilities.con}</td><td>${modCon}</td><td>${saveCon}</td></tr>
            <tr><td>Int</td><td>${monster.abilities.int}</td><td>${modInt}</td><td>${saveInt}</td></tr>
            <tr><td>Wis</td><td>${monster.abilities.wis}</td><td>${modWis}</td><td>${saveWis}</td></tr>
            <tr><td>Cha</td><td>${monster.abilities.cha}</td><td>${modCha}</td><td>${saveCha}</td></tr>
          </table>
          <hr>
          ${monster.skills ? `<p><strong>Skills</strong> ${monster.skills}</p>` : ''}
          ${monster.resistances ? `<p><strong>Resistances</strong> ${monster.resistances}</p>` : ''}
          ${monster.immunities ? `<p><strong>Immunities</strong> ${monster.immunities}</p>` : ''}
          ${monster.senses ? `<p><strong>Senses</strong> ${monster.senses}</p>` : ''}
          ${monster.languages ? `<p><strong>Languages</strong> ${monster.languages}</p>` : ''}
          ${monster.cr ? `<p><strong>CR</strong> ${monster.cr}</p>` : ''}
          ${monster.traits ? `<p><strong>Traits</strong><br>${monster.traits.replace(/\n/g, '<br>')}</p>` : ''}
          ${monster.actions ? `<p><strong>Actions</strong><br>${monster.actions.replace(/\n/g, '<br>')}</p>` : ''}
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

  getModifier(score) {
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : mod;
  }

  getSave(score) {
    // Assuming base save is modifier; adjust if proficiencies are added later
    return this.getModifier(score);
  }

  startEdit(id) {
    this.editingId = Number(id);
    this.renderMonsters();
  }

  saveEdit(id) {
    // Expand to handle all fields like addMonster
    const monster = this.monsters.find(m => m.id == id);
    if (!monster) return;
    // Pull values from edit inputs and update monster object
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
    // Clear all fields
    document.getElementById('monster-name').value = '';
    document.getElementById('monster-size').value = 'Medium';
    document.getElementById('monster-type').value = '';
    document.getElementById('monster-alignment').value = 'Neutral';
    document.getElementById('monster-ac').value = '';
    document.getElementById('monster-hp').value = '';
    document.getElementById('monster-hp-dice').value = '';
    document.getElementById('monster-speed').value = '';
    document.getElementById('monster-str').value = '10';
    document.getElementById('monster-dex').value = '10';
    document.getElementById('monster-con').value = '10';
    document.getElementById('monster-int').value = '10';
    document.getElementById('monster-wis').value = '10';
    document.getElementById('monster-cha').value = '10';
    document.getElementById('monster-skills').value = '';
    document.getElementById('monster-resistances').value = '';
    document.getElementById('monster-immunities').value = '';
    document.getElementById('monster-senses').value = '';
    document.getElementById('monster-languages').value = '';
    document.getElementById('monster-cr').value = '';
    document.getElementById('monster-traits').value = '';
    document.getElementById('monster-actions').value = '';
  }
}