// GTA Radio Games Data
// Local asset imports for logos and banners per game

import vcsLogo from '../assets/games/vcs/vcs-logo.png';
import vcsBanner from '../assets/games/vcs/vcs-banner.png';

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
        logo: 'https://placehold.co/200x200/E91E63/ffffff?text=Flash',
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
        logo: 'https://placehold.co/200x200/f44336/ffffff?text=V-Rock',
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
        logo: 'https://placehold.co/200x200/FF4081/ffffff?text=Emotion', 
        audioUrl: null, 
        duration: 0, 
        tracklist: [
          { type: 'DJ', artist: 'Lionel Makepeace', title: 'Emotion 98.3', startTime: 0, endTime: 10 }
        ] 
      },
      { 
        id: 'vcs-wave', 
        name: 'The Wave 103', 
        logo: 'https://placehold.co/200x200/2196F3/ffffff?text=Wave', 
        audioUrl: null, 
        duration: 0, 
        tracklist: [
          { type: 'DJ', artist: 'Trish Camden & Adam First', title: 'The Wave 103', startTime: 0, endTime: 10 }
        ] 
      },
      { 
        id: 'vcs-paradise', 
        name: 'Paradise FM', 
        logo: 'https://placehold.co/200x200/4CAF50/ffffff?text=Paradise', 
        audioUrl: null, 
        duration: 0, 
        tracklist: [
          { type: 'DJ', artist: 'Leslie "Big Lez" Segar', title: 'Paradise FM', startTime: 0, endTime: 10 }
        ] 
      },
      { 
        id: 'vcs-vcfl', 
        name: 'VCFL', 
        logo: 'https://placehold.co/200x200/795548/ffffff?text=VCFL', 
        audioUrl: null, 
        duration: 0, 
        tracklist: [
          { type: 'DJ', artist: 'Tina Jane', title: 'VCFL', startTime: 0, endTime: 10 }
        ] 
      },
      { 
        id: 'vcs-fresh', 
        name: 'Fresh 105 FM', 
        logo: 'https://placehold.co/200x200/8BC34A/000000?text=Fresh', 
        audioUrl: null, 
        duration: 0, 
        tracklist: [
          { type: 'DJ', artist: 'Luke', title: 'Fresh 105 FM', startTime: 0, endTime: 10 }
        ] 
      },
      { 
        id: 'vcs-espantoso', 
        name: 'Espantoso', 
        logo: 'https://placehold.co/200x200/FF5722/ffffff?text=Espantoso', 
        audioUrl: null, 
        duration: 0, 
        tracklist: [
          { type: 'DJ', artist: 'Hector Hernandez', title: 'Espantoso', startTime: 0, endTime: 10 }
        ] 
      },
      { 
        id: 'vcs-vcpr', 
        name: 'VCPR', 
        logo: 'https://placehold.co/200x200/9C27B0/ffffff?text=VCPR', 
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
  gta3: { 
    id: 'gta3', 
    name: 'Grand Theft Auto III', 
    logo: gta3Logo,
    banner: gta3Banner,
    background: '#0d0a0a', 
    stations: [] 
  },
};
