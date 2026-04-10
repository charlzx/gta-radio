import vcLogo from '../../assets/games/vc/vc-logo.png';
import vcBanner from '../../assets/games/vc/vc-banner.png';

export const vcGame = {
  id: 'vc',
  name: 'Grand Theft Auto - Vice City',
  logo: vcLogo,
  banner: vcBanner,
  background: '#0a0a0a',
  stations: [
    {
      id: 'vc-fever',
      name: 'Fever 105',
      logo: vcLogo,
      audioUrl: null,
      youtubeUrl: '2KOTYup9mVA',
      duration: 3780,
      tracklist: [
        { type: 'Song', artist: 'The Whispers', title: 'And the Beat Goes On', startTime: 4, endTime: 272 },
        { type: 'Song', artist: 'Fat Larry\'s Band', title: 'Act Like You Know', startTime: 272, endTime: 560 },
        { type: 'Song', artist: 'Oliver Cheatham', title: 'Get Down Saturday Night', startTime: 560, endTime: 963 },
        { type: 'Song', artist: 'Pointer Sisters', title: 'Automatic', startTime: 963, endTime: 1241 },
        { type: 'Song', artist: 'Rene & Angela', title: 'I\'ll Be Good', startTime: 1241, endTime: 1486 },
        { type: 'Song', artist: 'Mary Jane Girls', title: 'All Night Long', startTime: 1486, endTime: 1822 },
        { type: 'Song', artist: 'Rick James', title: 'Ghetto Life', startTime: 1822, endTime: 2079 },
        { type: 'Song', artist: 'Michael Jackson', title: 'Wanna Be Startin\' Somethin\'', startTime: 2079, endTime: 2437 },
        { type: 'Song', artist: 'Evelyn "Champagne" King', title: 'Shame', startTime: 2437, endTime: 2746 },
        { type: 'Song', artist: 'Teena Marie', title: 'Behind the Groove', startTime: 2746, endTime: 2964 },
        { type: 'Song', artist: 'Mtume', title: 'Juicy Fruit', startTime: 2964, endTime: 3224 },
        { type: 'Song', artist: 'Kool & the Gang', title: 'Summer Madness', startTime: 3224, endTime: 3538 },
        { type: 'Song', artist: 'Indeep', title: 'Last Night a D.J. Saved My Life', startTime: 3538, endTime: 3780 },
      ],
    },
  ],
};
