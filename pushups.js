var progress = [
  {
    date: 'Jan 9, 2018',
    andrey: 0+10+10+10+10+10+10+10,
    sergey: 0+30+20+20+20,
  },
  {
    date: 'Jan 8, 2018',
    andrey: 100,
    sergey: 100
  },
];

for (var entry of progress)
  entry.date = new Date(entry.date);

