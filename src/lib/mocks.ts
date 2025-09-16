export type LiveScore = {
  league: string;
  home: string;
  away: string;
  status: string;
  minuteOrInning?: string;
  homeScore: number;
  awayScore: number;
};

export type OnThisDayItem = {
  year: number;
  text: string;
  url?: string;
};

export const mockScores: LiveScore[] = [
  {
    league: 'NBA',
    home: 'Knicks',
    away: 'Celtics',
    status: 'Final',
    homeScore: 112,
    awayScore: 108
  },
  {
    league: 'MLB',
    home: 'Yankees',
    away: 'Red Sox',
    status: 'Top 7th',
    minuteOrInning: '7th',
    homeScore: 4,
    awayScore: 3
  },
  {
    league: 'NHL',
    home: 'Rangers',
    away: 'Devils',
    status: '2nd Period',
    minuteOrInning: '12:34',
    homeScore: 2,
    awayScore: 2
  },
  {
    league: 'MLS',
    home: 'NYCFC',
    away: 'Inter Miami',
    status: 'HT',
    minuteOrInning: '45+2',
    homeScore: 1,
    awayScore: 1
  },
  {
    league: 'NFL',
    home: 'Giants',
    away: 'Eagles',
    status: 'Sun 1:00 PM',
    homeScore: 0,
    awayScore: 0
  }
];

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
