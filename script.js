const START = new Date('Jan 8, 2018'); // Inclusive
const END = new Date('Feb 7, 2018'); // Exclusive
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const TODAY = new Date();
const YESTERDAY = new Date(Date.now() - MS_IN_DAY);
const TOTAL_DAYS = Math.round((END.getTime() - START.getTime()) / MS_IN_DAY);
const PUSHUPS_DAYILY = 100;
const TOTAL_PUSHUPS = PUSHUPS_DAYILY * TOTAL_DAYS;

const progress = [
  { date: 'Jan 8, 2018', a: 100, s: 100},
];

for (const entry of progress)
  entry.date = new Date(entry.date);

window.addEventListener('DOMContentLoaded', () => {
  let daysIn = 0;
  for (let date = START; date < TODAY && date < END; date = new Date(date.getTime() + MS_IN_DAY))
    ++daysIn;
  document.querySelector('.subtitle').textContent = `Day ${daysIn} of ${TOTAL_DAYS}`;

  let aTotal = 0;
  let sTotal = 0;
  let aToday = 0;
  let sToday = 0;
  for (const entry of progress) {
    if (entry.date <= TODAY) {
      aTotal += entry.a;
      sTotal += entry.s;
    }
    if (entry.date > YESTERDAY && entry.date <= TODAY) {
      aToday = entry.a;
      sToday = entry.s;
    }
  }

  document.querySelector('.a .progress-today .progress-label').textContent = `today: ${aToday}/100`;
  document.querySelector('.a .progress-total .progress-label').textContent = `total: ${aTotal}/${TOTAL_PUSHUPS}`;
  document.querySelector('.s .progress-today .progress-label').textContent = `today: ${sToday}/100`;
  document.querySelector('.s .progress-total .progress-label').textContent = `total: ${sTotal}/${TOTAL_PUSHUPS}`;


  requestAnimationFrame(() => {
    {
      const progressToday = document.querySelector('.a .progress-today .progress-fill');
      progressToday.style.setProperty('width', Math.round(aToday * 100 / PUSHUPS_DAYILY) + '%');
      const progressTotal = document.querySelector('.a .progress-total .progress-fill');
      progressTotal.style.setProperty('width', Math.round(aTotal * 100 / TOTAL_PUSHUPS) + '%');
    };
    {
      const progressToday = document.querySelector('.s .progress-today .progress-fill');
      progressToday.style.setProperty('width', Math.round(sToday * 100 / PUSHUPS_DAYILY) + '%');
      const progressTotal = document.querySelector('.s .progress-total .progress-fill');
      progressTotal.style.setProperty('width', Math.round(sTotal * 100 / TOTAL_PUSHUPS) + '%');
    }
  });
});

function handlePerson(name) {
}
