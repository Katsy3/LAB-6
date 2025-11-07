// --- Частина 1 ---
let studentName = "Рей";              // string
const studentAge = 23;                  // number
let isStudying = "так";                 // string (змінено з boolean на string)
let favoriteSubject = "Програмування";  // string
let currentGrade = 85;                  // number

console.log(studentName, typeof studentName);
console.log(studentAge, typeof studentAge);
console.log(isStudying, typeof isStudying);
console.log(favoriteSubject, typeof favoriteSubject);
console.log(currentGrade, typeof currentGrade);

// --- Частина 2 ---
let grade1 = 75, grade2 = 75, grade3 = 80;
let averageGrade = (grade1 + grade2 + grade3) / 3;

let category = "";
if (averageGrade >= 90) {
  category = "Відмінник";
} else if (averageGrade >= 80) {
  category = "Добре";
} else if (averageGrade >= 60) {
  category = "Погано";
} else {
  category = "Незадовільно";
}

let ageCategory = "";
if (studentAge < 18) {
  ageCategory = "Неповнолітній студент";
} else if (studentAge <= 25) {
  ageCategory = "Молодий студент";
} else {
  ageCategory = "Зрілий студент";
}

// --- Частина 3 ---
let fullName = studentName + " Бредбері"; 
console.log("Повне ім'я:", fullName);

console.log("Містить слово 'програм':", favoriteSubject.includes("програм"));
console.log("Ім'я у верхньому регістрі:", studentName.toUpperCase());
console.log("Довжина імені:", studentName.length);

let minGrade = Math.min(grade1, grade2, grade3);
let maxGrade = Math.max(grade1, grade2, grade3);
console.log("Різниця оцінок:", maxGrade - minGrade);

let newAge = studentAge + 1;
console.log("Вік наступного року:", newAge);

let successPercent = (averageGrade / 100) * 100;
console.log("Відсоток успішності:", successPercent + "%");

// --- Частина 4 (Вивід на сторінку) ---
document.getElementById("basicInfo").innerHTML = `
  <p><span>Ім'я:</span> ${fullName}</p>
  <p><span>Вік:</span> ${studentAge}</p>
  <p><span>Чи навчається:</span> ${isStudying}</p>
  <p><span>Улюблений предмет:</span> ${favoriteSubject}</p>
`;

document.getElementById("gradesInfo").innerHTML = `
  <p>Оцінки: ${grade1}, ${grade2}, ${grade3}</p>
  <p><span>Середній бал:</span> ${averageGrade.toFixed(2)}</p>
`;

document.getElementById("categoryInfo").innerHTML = `
  <p>${category}</p>
`;

document.getElementById("ageCategoryInfo").innerHTML = `
  <p>${ageCategory}</p>
`;