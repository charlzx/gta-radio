// GTA Radio Games Data
// Assets are organized by game for better maintainability

import vcsLogo from '../assets/games/vcs/vcs-logo.png';
import vcsBanner from '../assets/games/vcs/vcs-banner.png';
import vcsBackground from '../assets/games/vcs/vcs-bg.png';

export const games = {
  vcs: {
    id: 'vcs',
    name: 'Grand Theft Auto - Vice City Stories',
    logo: vcsLogo,
    banner: vcsBanner,
    background: 'https://placehold.co/1920x1080/000000/ffffff?text=VCS+Background',

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
    logo: 'https://placehold.co/400x150/FF1493/ffffff?text=Vice+City', 
    background: 'https://placehold.co/1920x1080/FF1493/000000?text=Vice+City+Background', 
    stations: [] 
  },
  sa: { 
    id: 'sa', 
    name: 'Grand Theft Auto - San Andreas', 
    logo: 'https://placehold.co/400x150/32CD32/ffffff?text=San+Andreas', 
    background: 'https://placehold.co/1920x1080/32CD32/000000?text=San+Andreas+Background', 
    stations: [] 
  },
  gtaiv: { 
    id: 'gtaiv', 
    name: 'Grand Theft Auto IV', 
    logo: 'https://placehold.co/400x150/696969/ffffff?text=GTA+IV', 
    background: 'https://placehold.co/1920x1080/696969/000000?text=GTA+IV+Background', 
    stations: [] 
  },
  gtav: { 
    id: 'gtav', 
    name: 'Grand Theft Auto V', 
    logo: 'https://placehold.co/400x150/00CED1/ffffff?text=GTA+V', 
    background: 'https://placehold.co/1920x1080/00CED1/000000?text=GTA+V+Background', 
    stations: [] 
  },
  gta3: { 
    id: 'gta3', 
    name: 'Grand Theft Auto III', 
    logo: 'https://placehold.co/400x150/8B0000/ffffff?text=GTA+III', 
    background: 'https://placehold.co/1920x1080/8B0000/000000?text=GTA+III+Background', 
    stations: [] 
  },
};
