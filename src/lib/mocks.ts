export type OnThisDayItem = {
  year: number;
  text: string;
  url?: string;
};

export const mockOtd: OnThisDayItem[] = [
  {
    year: 1995,
    text: 'Michael Jordan drops 55 points on the Knicks at Madison Square Garden in just his fifth game back from retirement.',
    url: 'https://www.nba.com/'
  },
  {
    year: 2004,
    text: 'Red Sox complete a historic comeback against the Yankees in the ALCS to reach the World Series.',
    url: 'https://www.mlb.com/'
  },
  {
    year: 1980,
    text: 'The U.S. hockey team defeats Finland to secure the Olympic gold medal in Lake Placid.',
    url: 'https://www.olympic.org/'
  },
  {
    year: 2010,
    text: 'Drew Brees leads the New Orleans Saints to their first Super Bowl victory.',
    url: 'https://www.nfl.com/'
  },
  {
    year: 1973,
    text: 'Secretariat wins the Triple Crown with a dominant Belmont Stakes performance.',
    url: 'https://www.belmontstakes.com/'
  }
];
