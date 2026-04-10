// GTA Radio Games Data
// Local asset imports for logos and banners per game

import vcsLogo from '../assets/games/vcs/vcs-logo.png';
import vcsBanner from '../assets/games/vcs/vcs-banner.png';

// VCS Station logos
import flashFMLogo from '../assets/games/vcs/stations/flashfm.png';
import vRockLogo from '../assets/games/vcs/stations/vrock.png';
import emotionLogo from '../assets/games/vcs/stations/emotion.png';
import waveLogo from '../assets/games/vcs/stations/wave.png';
import paradiseLogo from '../assets/games/vcs/stations/paradise.png';
import vcflLogo from '../assets/games/vcs/stations/vcfl.png';
import freshLogo from '../assets/games/vcs/stations/fresh.png';
import espantosoLogo from '../assets/games/vcs/stations/espantoso.png';
import vcprLogo from '../assets/games/vcs/stations/vcpr.png';

import vcLogo from '../assets/games/vc/vc-logo.png';
import vcBanner from '../assets/games/vc/vc-banner.png';

import saLogo from '../assets/games/sa/sa-logo.png';
import saBanner from '../assets/games/sa/sa-banner.png';

import gta3Logo from '../assets/games/gta3/gta3-logo.png';
import gta3Banner from '../assets/games/gta3/gta3-banner.png';

import gtaivLogo from '../assets/games/gtaiv/gtaiv-logo.png';
import gtaivBanner from '../assets/games/gtaiv/gtaiv-banner.png';

import gtavLogo from '../assets/games/gtav/gtav-logo.png';
import gtavBanner from '../assets/games/gtav/gtav-banner.png';

export const games = {
  vcs: {
    id: 'vcs',
    name: 'Grand Theft Auto - Vice City Stories',
    logo: vcsLogo,
    banner: vcsBanner,
    background: '#000000',

    stations: [
      {
        id: 'vcs-flash',
        name: 'Flash FM',
        logo: flashFMLogo,
        audioUrl: 'https://www.youtube.com/watch?v=4xDzrJKXOOY',
        duration: 3891,
        tracklist: [
          { type: 'Song', artist: 'Laura Branigan', title: 'Gloria', startTime: 0, endTime: 253 },
          { type: 'Song', artist: 'Rick Springfield', title: 'Human Touch', startTime: 253, endTime: 482 },
          { type: 'Song', artist: 'INXS', title: 'The One Thing', startTime: 482, endTime: 677 },
          { type: 'Song', artist: 'Philip Bailey & Phil Collins', title: 'Easy Lover', startTime: 677, endTime: 959 },
          { type: 'Song', artist: 'Scandal', title: 'The Warrior', startTime: 959, endTime: 1169 },
          { type: 'Song', artist: 'Alison Moyet', title: 'Love Resurrection', startTime: 1169, endTime: 1382 },
          { type: 'Song', artist: 'The Alan Parsons Project', title: 'Games People Play', startTime: 1382, endTime: 1664 },
          { type: 'Song', artist: 'Hall & Oates', title: 'Family Man', startTime: 1664, endTime: 1846 },
          { type: 'Song', artist: 'Pat Benatar', title: 'Love Is a Battlefield', startTime: 1846, endTime: 2046 },
          { type: 'Song', artist: 'Nik Kershaw', title: "Wouldn't It Be Good", startTime: 2046, endTime: 2243 },
          { type: 'Song', artist: 'Philip Oakey & Giorgio Moroder', title: 'Together in Electric Dreams', startTime: 2243, endTime: 2454 },
          { type: 'Song', artist: 'Talk Talk', title: "It's My Life (US Mix)", startTime: 2454, endTime: 2673 },
          { type: 'Song', artist: 'Missing Persons', title: 'Destination Unknown', startTime: 2673, endTime: 2871 },
          { type: 'Song', artist: 'Wang Chung', title: "Don't Let Go", startTime: 2871, endTime: 3082 },
          { type: 'Song', artist: 'Gino Vannelli', title: 'Appaloosa', startTime: 3082, endTime: 3249 },
          { type: 'Song', artist: 'Genesis', title: 'Turn It on Again', startTime: 3249, endTime: 3474 },
          { type: 'Song', artist: 'Blancmange', title: 'Living on the Ceiling', startTime: 3474, endTime: 3685 },
          { type: 'Song', artist: 'Paul Young', title: 'Come Back and Stay', startTime: 3685, endTime: 3891 },
        ],
      },
      {
        id: 'vcs-vrock',
        name: 'V-Rock',
        logo: vRockLogo,
        audioUrl: 'https://www.youtube.com/watch?v=tAGnKpE4NCI',
        duration: 3581,
        tracklist: [
          { type: 'Song', artist: 'Dio', title: 'Holy Diver', startTime: 32, endTime: 267 },
          { type: 'Song', artist: 'Queensrÿche', title: 'Queen of the Reich', startTime: 267, endTime: 592 },
          { type: 'Song', artist: 'KISS', title: 'Lick It Up', startTime: 592, endTime: 799 },
          { type: 'Song', artist: 'Dokken', title: 'Breaking the Chains', startTime: 799, endTime: 1111 },
          { type: 'Song', artist: 'Autograph', title: "All I'm Gonna Take", startTime: 1111, endTime: 1425 },
          { type: 'Song', artist: 'Accept', title: 'Balls to the Wall', startTime: 1425, endTime: 1681 },
          { type: 'Song', artist: 'Scorpions', title: 'Rock You Like a Hurricane', startTime: 1681, endTime: 1977 },
          { type: 'Song', artist: 'Krokus', title: 'Long Stick Goes Boom', startTime: 1977, endTime: 2201 },
          { type: 'Song', artist: 'Ted Nugent', title: 'Stranglehold', startTime: 2201, endTime: 2462 },
          { type: 'Song', artist: 'Ratt', title: 'Round and Round', startTime: 2462, endTime: 2681 },
          { type: 'Song', artist: 'Judas Priest', title: 'Electric Eye', startTime: 2681, endTime: 2971 },
          { type: 'Song', artist: 'Mötley Crüe', title: 'Looks That Kill', startTime: 2971, endTime: 3312 },
          { type: 'Song', artist: 'Quiet Riot', title: 'Metal Health', startTime: 3312, endTime: 3581 },
        ],
      },
      { 
        id: 'vcs-emotion', 
        name: 'Emotion 98.3', 
        logo: emotionLogo, 
        audioUrl: null, 
        duration: 0, 
        tracklist: [
          { type: 'DJ', artist: 'Lionel Makepeace', title: 'Emotion 98.3', startTime: 0, endTime: 10 }
        ] 
      },
      { 
        id: 'vcs-wave', 
        name: 'The Wave 103', 
        logo: waveLogo, 
        audioUrl: null, 
        duration: 0, 
        tracklist: [
          { type: 'DJ', artist: 'Trish Camden & Adam First', title: 'The Wave 103', startTime: 0, endTime: 10 }
        ] 
      },
      { 
        id: 'vcs-paradise', 
        name: 'Paradise FM', 
        logo: paradiseLogo, 
        audioUrl: null, 
        duration: 0, 
        tracklist: [
          { type: 'DJ', artist: 'Leslie "Big Lez" Segar', title: 'Paradise FM', startTime: 0, endTime: 10 }
        ] 
      },
      { 
        id: 'vcs-vcfl', 
        name: 'VCFL', 
        logo: vcflLogo, 
        audioUrl: null, 
        duration: 0, 
        tracklist: [
          { type: 'DJ', artist: 'Tina Jane', title: 'VCFL', startTime: 0, endTime: 10 }
        ] 
      },
      { 
        id: 'vcs-fresh', 
        name: 'Fresh 105 FM', 
        logo: freshLogo, 
        audioUrl: null, 
        duration: 0, 
        tracklist: [
          { type: 'DJ', artist: 'Luke', title: 'Fresh 105 FM', startTime: 0, endTime: 10 }
        ] 
      },
      { 
        id: 'vcs-espantoso', 
        name: 'Espantoso', 
        logo: espantosoLogo, 
        audioUrl: null, 
        duration: 0, 
        tracklist: [
          { type: 'DJ', artist: 'Hector Hernandez', title: 'Espantoso', startTime: 0, endTime: 10 }
        ] 
      },
      { 
        id: 'vcs-vcpr', 
        name: 'VCPR', 
        logo: vcprLogo, 
        audioUrl: null, 
        duration: 0, 
        tracklist: [
          { type: 'DJ', artist: 'Maurice Chavez', title: 'Pressing Issues', startTime: 0, endTime: 10 }
        ] 
      },
    ],
  },
  vc: { 
    id: 'vc', 
    name: 'Grand Theft Auto - Vice City', 
    logo: vcLogo,
    banner: vcBanner,
    background: '#0a0a0a', 
    stations: [] 
  },
  sa: { 
    id: 'sa', 
    name: 'Grand Theft Auto - San Andreas', 
    logo: saLogo,
    banner: saBanner,
    background: '#0b0f0b', 
    stations: [] 
  },
  gta3: { 
    id: 'gta3', 
    name: 'Grand Theft Auto III', 
    logo: gta3Logo,
    banner: gta3Banner,
    background: '#0d0a0a', 
    stations: [] 
  },
  gtaiv: { 
    id: 'gtaiv', 
    name: 'Grand Theft Auto IV', 
    logo: gtaivLogo,
    banner: gtaivBanner,
    background: '#0c0c0c', 
    stations: [] 
  },
  gtav: { 
    id: 'gtav', 
    name: 'Grand Theft Auto V', 
    logo: gtavLogo,
    banner: gtavBanner,
    background: '#081012', 
    stations: [] 
  },
};
