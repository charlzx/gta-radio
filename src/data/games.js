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
        audioUrl: 'https://storage.googleapis.com/gtaradio-test/VCS_Flash_FM.mp3',
        duration: 3891,
        tracklist: [
          { type: 'DJ', artist: 'Teri & Toni', title: 'Welcome to Flash', startTime: 0, endTime: 15 },
          { type: 'Song', artist: 'Hall & Oates', title: 'Out of Touch', startTime: 15, endTime: 246 },
        ],
      },
      {
        id: 'vcs-vrock',
        name: 'V-Rock',
        logo: vRockLogo,
        audioUrl: 'https://storage.googleapis.com/gtaradio-test/VCS_VRock.mp3',
        duration: 3581,
        tracklist: [
          { type: 'DJ', artist: 'Cousin Ed & Lazlow', title: 'Rockin Out', startTime: 0, endTime: 12 },
          { type: 'Song', artist: 'Dio', title: 'Holy Diver', startTime: 12, endTime: 250 },
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
