var START = new Date('Jan 8, 2018'); // Inclusive
var END = new Date('Feb 7, 2018'); // Exclusive
var MS_IN_DAY = 24 * 60 * 60 * 1000;
var DELAY = 5 * 60 * 60 * 1000; // Delay time to show yesterday's results after midnight until 5AM
var TODAY = new Date(Date.now() - DELAY);
var YESTERDAY = new Date(Date.now() - DELAY - MS_IN_DAY);
var TOTAL_DAYS = Math.round((END.getTime() - START.getTime()) / MS_IN_DAY);
var PUSHUPS_DAILY = 100;
var TOTAL_PUSHUPS = PUSHUPS_DAILY * TOTAL_DAYS;

var dataPromise = httpGET('https://rawgit.com/aslushnikov/100pushups/master/pushups.js');

window.addEventListener('DOMContentLoaded', function() {
  dataPromise.then(renderPushups);
});

function renderPushups(pushups) {
  var progress = eval(pushups);
  for (var entry of progress)
    entry.date = new Date(entry.date);

  var aTotal = 0;
  var sTotal = 0;
  var tTotal = 0;
  var aToday = 0;
  var sToday = 0;
  var tToday = 0;
  for (var entry of progress) {
    if (entry.date <= TODAY) {
      aTotal += entry.andrey;
      sTotal += entry.sergey;
      tTotal += entry.timur;
    }
    if (entry.date > YESTERDAY && entry.date <= TODAY) {
      aToday = entry.andrey;
      sToday = entry.sergey;
      tToday = entry.timur;
    }
  }
  var daysIn = 0;
  for (var date = START; date < TODAY && date < END; date = new Date(date.getTime() + MS_IN_DAY))
    ++daysIn;

  document.querySelector('.subtitle').textContent = `Day ${daysIn} of ${TOTAL_DAYS}`;

  document.querySelector('.a .progress-today .progress-label').textContent = `today: ${aToday}/100`;
  document.querySelector('.a .progress-total .progress-label').textContent = `total: ${aTotal}/${TOTAL_PUSHUPS}`;
  document.querySelector('.s .progress-today .progress-label').textContent = `today: ${sToday}/100`;
  document.querySelector('.s .progress-total .progress-label').textContent = `total: ${sTotal}/${TOTAL_PUSHUPS}`;
  document.querySelector('.t .progress-today .progress-label').textContent = `today: ${tToday}/100`;
  document.querySelector('.t .progress-total .progress-label').textContent = `total: ${tTotal}/${TOTAL_PUSHUPS}`;

  requestAnimationFrame(function () {
    {
      var progressToday = document.querySelector('.a .progress-today .progress-fill');
      progressToday.style.setProperty('width', Math.round(aToday * 100 / PUSHUPS_DAILY) + '%');
      var progressTotal = document.querySelector('.a .progress-total .progress-fill');
      progressTotal.style.setProperty('width', Math.round(aTotal * 100 / TOTAL_PUSHUPS) + '%');
    };
    {
      var progressToday = document.querySelector('.s .progress-today .progress-fill');
      progressToday.style.setProperty('width', Math.round(sToday * 100 / PUSHUPS_DAILY) + '%');
      var progressTotal = document.querySelector('.s .progress-total .progress-fill');
      progressTotal.style.setProperty('width', Math.round(sTotal * 100 / TOTAL_PUSHUPS) + '%');
    };
    {
      var progressToday = document.querySelector('.t .progress-today .progress-fill');
      progressToday.style.setProperty('width', Math.round(tToday * 100 / PUSHUPS_DAILY) + '%');
      var progressTotal = document.querySelector('.t .progress-total .progress-fill');
      progressTotal.style.setProperty('width', Math.round(tTotal * 100 / TOTAL_PUSHUPS) + '%');
    };
  });
}

function httpGET(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE)
        resolve(xhr.responseText);
    }
    xhr.open('GET', url, true);
    xhr.send(null);
  });
}
