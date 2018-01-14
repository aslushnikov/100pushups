var progress = [
  {
    date: 'Jan 13, 2018',
    andrey: 0+10+15+10+15+15,
    sergey: 0+10+15+10,
  },
  {
    date: 'Jan 12, 2018',
    andrey: 0+10+15+15+15+15+15+15,
    sergey: 0+20+20+20+20+20+20,
  },
  {
    date: 'Jan 11, 2018',
    andrey: 0+15+15+15+15+15+15+10,
    sergey: 0+25+20+20,
  },
  {
    date: 'Jan 10, 2018',
    andrey: 0+10+15+20+15+20+10+10,
    sergey: 0+30+20+25+23+2,
  },
  {
    date: 'Jan 9, 2018',
    andrey: 0+10+10+10+10+10+10+10+15+7+8,
    sergey: 0+30+20+20+20+15,
  },
  {
    date: 'Jan 8, 2018',
    andrey: 100,
    sergey: 100
  },
];

for (var entry of progress)
  entry.date = new Date(entry.date);

