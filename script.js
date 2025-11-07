* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Segoe UI', Tahoma, sans-serif;
  background: #f0f2f5;
  color: #1a1a1a;
  line-height: 1.6;
}
.container { max-width: 1100px; margin: 0 auto; padding: 20px; }
h1 { text-align: center; color: #2c3e50; margin-bottom: 30px; }
h2 { color: #2980b9; border-bottom: 3px solid #3498db; padding-bottom: 8px; margin-bottom: 15px; }

section {
  background: white;
  padding: 25px;
  margin: 25px 0;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
}

/* Кнопки */
button {
  padding: 10px 16px;
  margin: 5px;
  border: none;
  border-radius: 6px;
  background: #3498db;
  color: white;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}
button:hover { background: #2980b9; transform: translateY(-1px); }
button:active { transform: translateY(0); }

/* Поля */
.input-group { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px; }
input, select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1em;
}
input:focus, select:focus { outline: 2px solid #3498db; }

/* === 1. To-Do === */
.filters button { background: #95a5a6; }
.filters button.active { background: #27ae60; }
.task {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 12px;
}
.task input[type="checkbox"] { transform: scale(1.2); }
.done { text-decoration: line-through; color: #7f8c8d; }

/* === 2. Галерея === */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 15px;
}
.gallery img {
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}
.gallery img:hover { transform: scale(1.05); box-shadow: 0 8px 15px rgba(0,0,0,0.2); }

.modal {
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.95);
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal img { max-width: 90%; max-height: 80vh; border-radius: 12px; }
.caption { color: #fff; font-size: 1.5em; margin-top: 15px; text-align: center; }
.close, .nav {
  position: absolute;
  color: white;
  font-size: 3em;
  cursor: pointer;
  user-select: none;
  font-weight: bold;
}
.close { top: 20px; right: 30px; }
.prev { left: 20px; top: 50%; transform: translateY(-50%); }
.next { right: 20px; top: 50%; transform: translateY(-50%); }

/* === 3. Форми === */
.field-item {
  padding: 16px;
  margin: 12px 0;
  background: #f8f9fa;
  border: 2px dashed #3498db;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

/* === 4. Таблиця === */
table { width: 100%; border-collapse: collapse; margin: 15px 0; }
th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
th {
  background: #3498db;
  color: white;
  cursor: pointer;
  user-select: none;
}
th:hover { background: #2980b9; }
td input { width: 100%; border: none; padding: 8px; font-size: 1em; }
.pagination { margin-top: 15px; text-align: center; }
.pagination button {
  min-width: 40px;
  background: #ecf0f1;
  color: #2c3e50;
}
.pagination button.active { background: #27ae60; color: white; }

/* === 5. Dropdown === */
.dropdown { position: relative; display: inline-block; }
.dropbtn {
  background: #9b59b6;
  min-width: 240px;
  text-align: left;
  padding: 14px 20px;
  border-radius: 8px;
  font-size: 1.1em;
}
.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 8px;
  max-height: 280px;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  z-index: 100;
}
.dropdown-item {
  padding: 12px 18px;
  cursor: pointer;
  transition: background 0.2s;
}
.dropdown-item:hover,
.dropdown-item.focus {
  background: #f1f1f1;
}
.show { display: block; }
