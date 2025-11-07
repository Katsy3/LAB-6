// === 1. To-Do ===
const Todo = {
  tasks: [],
  filter: 'all',

  init() {
    document.getElementById('addBtn').onclick = () => this.add();
    document.querySelectorAll('.filters button[data-filter]').forEach(btn => {
      btn.onclick = () => this.setFilter(btn.dataset.filter);
    });
    document.getElementById('clearDone').onclick = () => this.clearDone();
    document.getElementById('todoInput').addEventListener('keypress', e => {
      if (e.key === 'Enter') this.add();
    });
    this.render();
  },

  add() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (!text) return;
    this.tasks.push({ id: Date.now(), text, done: false });
    input.value = '';
    this.render();
  },

  toggle(id) {
    this.tasks = this.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    this.render();
  },

  remove(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.render();
  },

  setFilter(type) {
    this.filter = type;
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-filter="${type}"]`).classList.add('active');
    this.render();
  },

  clearDone() {
    this.tasks = this.tasks.filter(t => !t.done);
    this.render();
  },

  render() {
    const list = document.getElementById('todoList');
    const count = document.getElementById('todoCount');
    list.innerHTML = '';

    const filtered = this.tasks.filter(t => {
      if (this.filter === 'active') return !t.done;
      if (this.filter === 'done') return t.done;
      return true;
    });

    filtered.forEach(t => {
      const li = document.createElement('li');
      li.className = 'task';
      li.innerHTML = `
        <input type="checkbox" ${t.done ? 'checked' : ''} onchange="Todo.toggle(${t.id})">
        <span class="${t.done ? 'done' : ''}">${t.text}</span>
        <button onclick="Todo.remove(${t.id})">X</button>
      `;
      list.appendChild(li);
    });

    count.textContent = this.tasks.filter(t => !t.done).length;
  }
};

// === 2. Галерея ===
const Gallery = {
  images: [
    { src: "https://picsum.photos/800/600?random=1", caption: "Гори" },
    { src: "https://picsum.photos/800/600?random=2", caption: "Океан" },
    { src: "https://picsum.photos/800/600?random=3", caption: "Ліс" },
    { src: "https://picsum.photos/800/600?random=4", caption: "Місто" },
    { src: "https://picsum.photos/800/600?random=5", caption: "Пустеля" }
  ],
  current: 0,

  init() {
    const container = document.getElementById('galleryThumbs');
    this.images.forEach((img, i) => {
      const div = document.createElement('div');
      const thumb = new Image();
      thumb.src = img.src.replace('800/600', '300/200');
      thumb.onclick = () => this.open(i);
      thumb.alt = img.caption;
      div.appendChild(thumb);
      container.appendChild(div);
    });

    document.querySelector('.close').onclick = () => this.close();
    document.querySelector('.prev').onclick = () => this.nav(-1);
    document.querySelector('.next').onclick = () => this.nav(1);
    document.getElementById('modal').onclick = e => e.target.id === 'modal' && this.close();
  },

  open(i) {
    this.current = i;
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    document.getElementById('modalImg').src = this.images[i].src;
    document.getElementById('modalCaption').textContent = this.images[i].caption;
  },

  close() {
    document.getElementById('modal').style.display = 'none';
  },

  nav(dir) {
    this.current = (this.current + dir + this.images.length) % this.images.length;
    this.open(this.current);
  }
};

// === 3. Форми ===
const FormBuilder = {
  fields: [],

  init() {
    document.getElementById('addFieldBtn').onclick = () => this.add();
    document.getElementById('exportJson').onclick = () => this.export();
    this.render();
  },

  add() {
    const type = document.getElementById('fieldType').value;
    const label = document.getElementById('fieldLabel').value.trim() || 'Поле';
    this.fields.push({ label, type, required: false });
    document.getElementById('fieldLabel').value = '';
    this.render();
  },

  remove(i) {
    this.fields.splice(i, 1);
    this.render();
  },

  move(i, dir) {
    const ni = i + dir;
    if (ni < 0 || ni >= this.fields.length) return;
    [this.fields[i], this.fields[ni]] = [this.fields[ni], this.fields[i]];
    this.render();
  },

  render() {
    const container = document.getElementById('fieldsList');
    container.innerHTML = '';
    this.fields.forEach((f, i) => {
      const div = document.createElement('div');
      div.className = 'field-item';
      div.innerHTML = `
        <div>
          <strong>${f.label}</strong> <small>(${f.type})</small>
        </div>
        <div>
          <button onclick="FormBuilder.remove(${i})">Видалити</button>
          <button onclick="FormBuilder.move(${i},-1)">Up</button>
          <button onclick="FormBuilder.move(${i},1)">Down</button>
        </div>
      `;
      container.appendChild(div);
    });
  },

  export() {
    const result = { title: "Моя форма", fields: this.fields };
    const json = JSON.stringify(result, null, 2);
    alert(json);
    console.log(json);
  }
};

// === 4. Таблиця ===
const Table = {
  data: [
    ["Олена", 28, "Київ"],
    ["Максим", 34, "Львів"],
    ["Софія", 19, "Одеса"]
  ],
  page: 1,
  perPage: 2,
  sortCol: null,
  sortAsc: true,
  filter: '',

  init() {
    document.getElementById('addRowBtn').onclick = () => this.addRow();
    document.getElementById('exportCsv').onclick = () => this.exportCSV();
    document.getElementById('filterInput').oninput = e => this.filter(e.target.value);
    document.querySelectorAll('th[data-col]').forEach(th => {
      th.onclick = () => this.sort(+th.dataset.col);
    });
    this.render();
  },

  render() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';

    let filtered = this.data.filter(row =>
      row.some(cell => cell.toString().toLowerCase().includes(this.filter.toLowerCase()))
    );

    if (this.sortCol !== null) {
      filtered.sort((a, b) => {
        const x = a[this.sortCol], y = b[this.sortCol];
        return (x > y ? 1 : -1) * (this.sortAsc ? 1 : -1);
      });
    }

    const start = (this.page - 1) * this.perPage;
    const pageData = filtered.slice(start, start + this.perPage);

    pageData.forEach((row, i) => {
      const tr = document.createElement('tr');
      row.forEach((cell, j) => {
        const td = document.createElement('td');
        const input = document.createElement('input');
        input.value = cell;
        input.onchange = () => {
          const globalIndex = this.data.indexOf(row);
          this.data[globalIndex][j] = input.value;
        };
        td.appendChild(input);
        tr.appendChild(td);
      });
      const del = document.createElement('td');
      del.innerHTML = `<button onclick="Table.removeRow(${this.data.indexOf(row)})">X</button>`;
      tr.appendChild(del);
      tbody.appendChild(tr);
    });

    this.renderPagination(filtered.length);
  },

  renderPagination(total) {
    const div = document.getElementById('pagination');
    div.innerHTML = '';
    const pages = Math.max(1, Math.ceil(total / this.perPage));
    for (let i = 1; i <= pages; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === this.page) btn.classList.add('active');
      btn.onclick = () => { this.page = i; this.render(); };
      div.appendChild(btn);
    }
  },

  addRow() {
    this.data.push(["Новий", 0, "Місто"]);
    this.render();
  },

  removeRow(i) {
    this.data.splice(i, 1);
    this.render();
  },

  sort(col) {
    if (this.sortCol === col) this.sortAsc = !this.sortAsc;
    else { this.sortCol = col; this.sortAsc = true; }
    this.render();
  },

  filter(val) {
    this.filter = val;
    this.page = 1;
    this.render();
  },

  exportCSV() {
    const csv = this.data.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table.csv';
    a.click();
  }
};

// === 5. Dropdown ===
const Dropdown = {
  options: ["Україна", "Польща", "Німеччина", "Франція", "Іспанія", "Італія", "Чехія", "Португалія", "Греція"],
  focused: -1,

  init() {
    const btn = document.getElementById('dropBtn');
    const menu = document.getElementById('dropdownMenu');

    this.renderMenu();

    btn.onclick = () => {
      const isOpen = menu.classList.toggle('show');
      btn.setAttribute('aria-expanded', isOpen);
      if (isOpen) this.focused = 0, this.highlight(0);
    };

    document.addEventListener('click', e => {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('show');
        btn.setAttribute('aria-expanded', false);
      }
    });

    // Клавіатура
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });

    menu.addEventListener('keydown', e => {
      if (e.key === 'Escape') { menu.classList.remove('show'); btn.focus(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); this.focused = (this.focused + 1) % this.options.length; this.highlight(this.focused); }
      if (e.key === 'ArrowUp') { e.preventDefault(); this.focused = (this.focused - 1 + this.options.length) % this.options.length; this.highlight(this.focused); }
      if (e.key === 'Enter') { e.preventDefault(); this.select(this.options[this.focused]); }
    });

    // Пошук
    let search = '';
    document.addEventListener('keydown', e => {
      if (!menu.classList.contains('show')) return;
      if (/[a-zа-яё]/i.test(e.key)) {
        search += e.key.toLowerCase();
        setTimeout(() => search = search.slice(1), 800);
        const idx = this.options.findIndex(opt => opt.toLowerCase().startsWith(search));
        if (idx !== -1) { this.focused = idx; this.highlight(idx); }
      }
    });
  },

  renderMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.innerHTML = '';
    this.options.forEach((opt, i) => {
      const div = document.createElement('div');
      div.className = 'dropdown-item';
      div.textContent = opt;
      div.tabIndex = -1;
      div.onclick = () => this.select(opt);
      menu.appendChild(div);
    });
  },

  highlight(i) {
    document.querySelectorAll('.dropdown-item').forEach((el, idx) => {
      el.classList.toggle('focus', idx === i);
      if (idx === i) el.scrollIntoView({ block: 'nearest' });
    });
  },

  select(val) {
    document.getElementById('dropBtn').textContent = val + ' Down Arrow';
    document.getElementById('selectedCountry').textContent = val;
    document.getElementById('dropdownMenu').classList.remove('show');
    document.getElementById('dropBtn').setAttribute('aria-expanded', false);
  }
};

// === ЗАПУСК ===
window.onload = () => {
  Todo.init();
  Gallery.init();
  FormBuilder.init();
  Table.init();
  Dropdown.init();

  // Escape для галереї
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('modal').style.display === 'flex') {
      Gallery.close();
    }
  });
};
