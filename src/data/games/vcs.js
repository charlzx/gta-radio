import vcsLogo from '../../assets/games/vcs/vcs-logo.png';
import vcsBanner from '../../assets/games/vcs/vcs-banner.png';

import flashFMLogo from '../../assets/games/vcs/stations/flashfm.png';
import vRockLogo from '../../assets/games/vcs/stations/vrock.png';
import emotionLogo from '../../assets/games/vcs/stations/emotion.png';
import waveLogo from '../../assets/games/vcs/stations/wave.png';
import paradiseLogo from '../../assets/games/vcs/stations/paradise.png';
import vcflLogo from '../../assets/games/vcs/stations/vcfl.png';
import freshLogo from '../../assets/games/vcs/stations/fresh.png';
import espantosoLogo from '../../assets/games/vcs/stations/espantoso.png';
import vcprLogo from '../../assets/games/vcs/stations/vcpr.png';

export const vcsGame = {
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
      audioUrl: 'https://ilotriyjo9w6fmk1.public.blob.vercel-storage.com/flashfm.mp3',
      youtubeUrl: 'L0ejZEUwSeg',
      duration: 3891,
      stationMeta: {
        info: {
          genre: '1980s pop, synth-pop, rock',
          yearsActiveInLore: '1984-1986',
          city: 'Vice City',
          about:
            'Flash FM returns in GTA Vice City Stories as a co-hosted pop station. Toni and Teri front the show in 1984, and Toni becomes the sole host by 1986. The station keeps the same mainstream pop identity as the Vice City version but adds a sharper on-air back-and-forth.',
          shortDescription:
            'Flash FM is Vice City\'s mainstream pop station, with fast-paced on-air banter and chart-heavy 80s rotation.',
          notableTraits: ['Top-40 tone', 'Co-host era in 1984', 'Recurring station across VC timeline'],
        },
        host: {
          name: 'Teri',
          actor: 'Zan Aron',
          bio: 'Primary 1984 host with a sharp, snarky delivery.',
          style: 'Brash, witty, and confrontational.',
        },
      },
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
      audioUrl: 'https://ilotriyjo9w6fmk1.public.blob.vercel-storage.com/vrock.mp3',
      youtubeUrl: 'L0ejZEUwSeg',
      duration: 3581,
      stationMeta: {
        info: {
          genre: 'Hard rock, heavy metal',
          yearsActiveInLore: '1984-1986',
          city: 'Vice City',
          about:
            'V-Rock is the rock station in GTA Vice City Stories. In 1984 it is based in Reddick, Florida and co-hosted by Couzin Ed and Lazlow; by 1986 it has moved to Vice City and Lazlow is alone on-air. The station keeps the same hard rock and heavy metal identity, with antagonistic promos and a vulture mascot.',
          shortDescription:
            'V-Rock is the loud, abrasive hard rock station in Vice City Stories, centered on metal and attitude.',
          notableTraits: ['Couzin Ed-led in 1984', 'Lazlow intern continuity', 'Aggressive station branding'],
        },
        host: {
          name: 'Couzin Ed',
          actor: 'Couzin Ed (as himself)',
          bio: 'The main 1984 V-Rock personality, later replaced by Lazlow in VC timeline continuity.',
          style: 'Combative, macho, and relentless.',
        },
      },
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
      youtubeUrl: 'on8PwFZCep0',
      duration: 4200,
      stationMeta: {
        info: {
          genre: 'Power ballads, soft rock',
          yearsActiveInLore: '1984-1986',
          city: 'Vice City',
          about:
            'Emotion 98.3 returns in GTA Vice City Stories with Lionel Makepeace on air. It plays soft pop, power ballads, and soft rock. Compared with Fernando Martinez\'s later Vice City version, the VCS incarnation leans more into Lionel\'s wounded-romantic personality and listener-begging tone.',
          shortDescription:
            'Emotion 98.3 is the romantic soft-pop station with heartbreak-heavy monologues and late-night mood.',
          notableTraits: ['Love-and-loss format', '1984 co-host dynamic', 'Recurring Emotion continuity'],
        },
        host: {
          name: 'Lionel Makepeace',
          actor: 'Steve Stratton',
          bio: 'A melancholy host whose vulnerable tone defines the 1984 version of Emotion 98.3.',
          style: 'Soft, introspective, and emotional.',
        },
      },
      tracklist: [
        { type: 'Song', artist: 'The Motels', title: 'Only the Lonely', startTime: 7, endTime: 174 },
        { type: 'Song', artist: '10cc', title: "I'm Not in Love", startTime: 174, endTime: 486 },
        { type: 'Song', artist: 'Quarterflash', title: 'Harden My Heart', startTime: 486, endTime: 786 },
        { type: 'Song', artist: 'Toto', title: 'Make Believe', startTime: 786, endTime: 994 },
        { type: 'Song', artist: 'Elkie Brooks', title: "Fool If You Think It's Over", startTime: 994, endTime: 1263 },
        { type: 'Song', artist: 'The Passions', title: "I'm in Love with a German Film Star", startTime: 1263, endTime: 1544 },
        { type: 'Song', artist: 'Foreigner', title: 'I Want to Know What Love Is', startTime: 1544, endTime: 1785 },
        { type: 'Song', artist: 'The Assembly', title: 'Never Never', startTime: 1785, endTime: 2054 },
        { type: 'Song', artist: 'Pat Benatar', title: 'We Belong', startTime: 2054, endTime: 2294 },
        { type: 'Song', artist: 'The Pretenders', title: 'Private Life', startTime: 2294, endTime: 2504 },
        { type: 'Song', artist: 'Phil Collins', title: 'In the Air Tonight', startTime: 2504, endTime: 2794 },
        { type: 'Song', artist: 'Roxy Music', title: 'Avalon', startTime: 2794, endTime: 3074 },
        { type: 'Song', artist: 'Eddie Money', title: 'Baby Hold On', startTime: 3074, endTime: 3286 },
        { type: 'Song', artist: 'Rainbow', title: 'Stone Cold', startTime: 3286, endTime: 3543 },
        { type: 'Song', artist: 'Giuffria', title: 'Call to the Heart', startTime: 3543, endTime: 3774 },
        { type: 'Song', artist: 'Art of Noise', title: 'Moments in Love', startTime: 3774, endTime: 3975 },
        { type: 'Song', artist: 'Dan Hartman', title: 'I Can Dream About You', startTime: 3975, endTime: 4200 },
      ],
    },
    {
      id: 'vcs-wave',
      name: 'The Wave 103',
      logo: waveLogo,
      audioUrl: null,
      youtubeUrl: 'NDnVROj95lM',
      duration: 3660,
      stationMeta: {
        info: {
          genre: 'New wave, synth-pop, post-punk',
          yearsActiveInLore: '1981-1986',
          city: 'Vice City',
          about:
            'Wave 103 returns in GTA Vice City Stories as The Wave 103. It started broadcasting in 1981 and is co-hosted by Adam First and Trish Camden in 1984. The station keeps its new wave, synth-pop, and post-punk identity while using a more argumentative two-host setup.',
          shortDescription:
            'The Wave 103 delivers Vice City\'s new wave and synth-pop sound with detached style and scene-driven commentary.',
          notableTraits: ['Started in 1981 in lore', 'Co-host setup in VCS', 'Anti-mainstream imaging'],
        },
        host: {
          name: 'Trish Camden',
          actor: null,
          bio: 'Primary co-host in the 1984 timeline, sharing duties with Adam First.',
          style: 'Cool, understated, and opinionated.',
        },
      },
      tracklist: [
        { type: 'Song', artist: 'The Human League', title: 'Love Action (I Believe in Love)', startTime: 10, endTime: 280 },
        { type: 'Song', artist: 'Thompson Twins', title: 'Love on Your Side', startTime: 280, endTime: 562 },
        { type: 'Song', artist: 'Depeche Mode', title: 'Everything Counts', startTime: 562, endTime: 805 },
        { type: 'Song', artist: 'Blondie', title: 'Heart of Glass', startTime: 805, endTime: 1045 },
        { type: 'Song', artist: 'Frankie Goes to Hollywood', title: 'Relax', startTime: 1045, endTime: 1275 },
        { type: 'Song', artist: 'ABC', title: '(How to Be a) Millionaire', startTime: 1275, endTime: 1565 },
        { type: 'Song', artist: 'New Order', title: 'Blue Monday', startTime: 1565, endTime: 1824 },
        { type: 'Song', artist: 'Japan', title: 'Quiet Life', startTime: 1824, endTime: 2105 },
        { type: 'Song', artist: 'Kajagoogoo', title: 'Too Shy (Midnight Mix)', startTime: 2105, endTime: 2315 },
        { type: 'Song', artist: 'Heaven 17', title: 'Penthouse and Pavement', startTime: 2315, endTime: 2535 },
        { type: 'Song', artist: 'Berlin', title: "Sex, (I'm A...)", startTime: 2535, endTime: 2795 },
        { type: 'Song', artist: 'Howard Jones', title: 'Like to Get to Know You Well', startTime: 2795, endTime: 3004 },
        { type: 'Song', artist: 'The Cure', title: 'A Forest', startTime: 3004, endTime: 3215 },
        { type: 'Song', artist: 'A Flock of Seagulls', title: 'Space Age Love Song', startTime: 3215, endTime: 3435 },
        { type: 'Song', artist: 'Yazoo', title: "Don't Go", startTime: 3435, endTime: 3660 },
      ],
    },
    {
      id: 'vcs-paradise',
      name: 'Paradise FM',
      logo: paradiseLogo,
      audioUrl: null,
      youtubeUrl: 'Ti360Mx_0aE',
      duration: 2460,
      stationMeta: {
        info: {
          genre: 'Post-disco, disco, jazz-funk',
          yearsActiveInLore: '1984',
          city: 'Vice City',
          about:
            'Paradise FM is a music-only station in GTA Vice City Stories. It plays post-disco, disco, and jazz-funk. Available sources describe it as a continuous mix with no DJ, making it structurally different from the personality-led stations on the Vice City dial.',
          shortDescription:
            'Paradise FM is a music-driven disco and jazz-funk station in VCS without a named on-air DJ.',
          notableTraits: ['VCS-exclusive station', 'No host personality segments', 'Dancefloor-focused curation'],
        },
        host: {
          name: null,
          actor: null,
          bio: null,
          style: null,
        },
      },
      tracklist: [
        { type: 'Song', artist: 'Unlimited Touch', title: 'I Hear Music in the Streets', startTime: 1, endTime: 178 },
        { type: 'Song', artist: 'Plunky & the Oneness of Juju', title: 'Everyway but Loose (Larry Levan remix)', startTime: 178, endTime: 417 },
        { type: 'Song', artist: 'Geraldine Hunt', title: "Can't Fake the Feeling", startTime: 417, endTime: 589 },
        { type: 'Song', artist: 'Raw Silk', title: 'Do It to the Music', startTime: 589, endTime: 762 },
        { type: 'Song', artist: 'Jimmy Bo Horne', title: 'Is It In', startTime: 762, endTime: 925 },
        { type: 'Song', artist: 'Exodus', title: 'Together Forever', startTime: 925, endTime: 1105 },
        { type: 'Song', artist: 'Jackie Moore', title: 'This Time Baby', startTime: 1105, endTime: 1395 },
        { type: 'Song', artist: 'Class Action', title: 'Weekend (Tonight Is Party Time)', startTime: 1395, endTime: 1585 },
        { type: 'Song', artist: 'Gwen Guthrie', title: 'It Should Have Been You', startTime: 1585, endTime: 1795 },
        { type: 'Song', artist: 'Thelma Houston', title: 'You Used to Hold Me So Tight', startTime: 1795, endTime: 1955 },
        { type: 'Song', artist: 'Sister Sledge', title: 'Lost in Music (1984 Bernard Edwards & Nile Rodgers Remix)', startTime: 1955, endTime: 2115 },
        { type: 'Song', artist: 'Donald Byrd', title: 'Love Has Come Around', startTime: 2115, endTime: 2285 },
        { type: 'Song', artist: 'Change', title: 'The Glow of Love', startTime: 2285, endTime: 2460 },
      ],
    },
    {
      id: 'vcs-vcfl',
      name: 'VCFL',
      logo: vcflLogo,
      audioUrl: null,
      youtubeUrl: 'gQlsIr8wTN0',
      duration: 2120,
      stationMeta: {
        info: {
          genre: 'Soul, funk, disco, quiet storm, R&B',
          yearsActiveInLore: '1984',
          city: 'Vice City',
          about:
            'Vice City For Lovers is a soul and R&B station in GTA Vice City Stories. It is hosted by Tina Jane and plays soul, funk, disco, quiet storm, and R&B. The station is built around romance, listener requests, and urban adult contemporary framing.',
          shortDescription:
            'Vice City For Lovers (VCFL) is a romance-first adult contemporary station with smooth soul and dedication vibes.',
          notableTraits: ['Quiet storm format parody', 'Request-driven feel', 'VCS-exclusive identity'],
        },
        host: {
          name: 'Tina Jane',
          actor: 'Pat Floyd',
          bio: 'VCFL host known for intimate call-ins and romantic framing between songs.',
          style: 'Sultry, relaxed, and playful.',
        },
      },
      tracklist: [
        { type: 'Song', artist: 'Marvin Gaye', title: 'Sexual Healing', startTime: 0, endTime: 201 },
        { type: 'Song', artist: 'Earth, Wind & Fire', title: 'Fantasy', startTime: 201, endTime: 447 },
        { type: 'Song', artist: 'Hot Chocolate', title: 'It Started with a Kiss', startTime: 447, endTime: 642 },
        { type: 'Song', artist: 'Rick James', title: 'Mary Jane', startTime: 642, endTime: 811 },
        { type: 'Song', artist: 'Commodores', title: 'Nightshift', startTime: 811, endTime: 984 },
        { type: 'Song', artist: 'Wally Badarou', title: 'Mambo', startTime: 984, endTime: 1162 },
        { type: 'Song', artist: 'Barry White', title: "It's Ecstasy When You Lay Down Next to Me", startTime: 1162, endTime: 1393 },
        { type: 'Song', artist: 'Roy Ayers Ubiquity', title: 'Everybody Loves the Sunshine', startTime: 1393, endTime: 1656 },
        { type: 'Song', artist: 'Keni Burke', title: "Risin' to the Top", startTime: 1656, endTime: 1882 },
        { type: 'Song', artist: 'Teddy Pendergrass', title: 'Love T.K.O.', startTime: 1882, endTime: 2120 },
      ],
    },
    {
      id: 'vcs-fresh',
      name: 'Fresh 105 FM',
      logo: freshLogo,
      audioUrl: null,
      youtubeUrl: 'PR61dYsqCBQ',
      duration: 1800,
      stationMeta: {
        info: {
          genre: 'Old-school hip-hop, electro, breakbeat',
          yearsActiveInLore: '1984',
          city: 'Vice City',
          about:
            'Fresh 105 FM is the hip-hop, electro, and breakbeat station in GTA Vice City Stories. It is hosted by Luke Campbell and broadcasts from the Malibu Club in Vice Point. The station is notable for having no sponsor and a freer, more uncensored on-air style.',
          shortDescription:
            'Fresh 105 FM is a pirate hip-hop station in VCS known for uncensored energy and club-based broadcast identity.',
          notableTraits: ['No-sponsor style', 'Malibu Club broadcast lore', 'Predecessor to Fever 105 timeline'],
        },
        host: {
          name: 'Luke Campbell',
          actor: 'Luke Campbell (as himself)',
          bio: 'A real-world rap figure represented as Fresh 105 FM\'s unfiltered on-air personality.',
          style: 'Raw, loud, and rebellious.',
        },
      },
      tracklist: [
        { type: 'Song', artist: 'Afrika Bambaataa & the Soul Sonic Force', title: 'Renegades of Funk', startTime: 1, endTime: 188 },
        { type: 'Song', artist: 'Jonzun Crew', title: 'Pack Jam (Look Out for the OVC)', startTime: 188, endTime: 345 },
        { type: 'Song', artist: 'Run D.M.C.', title: "It's Like That", startTime: 345, endTime: 515 },
        { type: 'Song', artist: 'Planet Patrol', title: 'Play at Your Own Risk', startTime: 515, endTime: 715 },
        { type: 'Song', artist: 'The Egyptian Lover', title: 'Egypt, Egypt', startTime: 715, endTime: 905 },
        { type: 'Song', artist: 'Art of Noise', title: 'Beat Box (Diversion One)', startTime: 905, endTime: 1075 },
        { type: 'Song', artist: 'Man Parrish', title: 'Boogie Down Bronx', startTime: 1075, endTime: 1225 },
        { type: 'Song', artist: 'Rock Master Scott & the Dynamic Three', title: 'Request Line', startTime: 1225, endTime: 1424 },
        { type: 'Song', artist: 'Midnight Star', title: 'Freak-a-Zoid', startTime: 1424, endTime: 1605 },
        { type: 'Song', artist: 'Whodini', title: 'Freaks Come Out at Night', startTime: 1605, endTime: 1800 },
      ],
    },
    {
      id: 'vcs-espantoso',
      name: 'Espantoso',
      logo: espantosoLogo,
      audioUrl: null,
      youtubeUrl: 'Y2ZxIkZANks',
      duration: 1680,
      stationMeta: {
        info: {
          genre: 'Latin jazz, son, mambo, salsa',
          yearsActiveInLore: '1984-1986',
          city: 'Vice City',
          about:
            'Radio Espantoso returns in GTA Vice City Stories as the city\'s Latin station. In 1984 it is hosted by Hector Hernandez; by 1986 Pepe is the DJ in Vice City. The station keeps its Latin jazz, mambo, son, salsa, and Latin funk identity while shifting hosts between periods.',
          shortDescription:
            'Radio Espantoso is Vice City\'s Latin station, combining energetic salsa-era classics with strong Spanish-language identity.',
          notableTraits: ['Bilingual presentation', 'Host changed by 1986', 'Latin club and dance emphasis'],
        },
        host: {
          name: 'Hector Hernandez',
          actor: 'Frank Rodriguez',
          bio: 'The 1984-era Espantoso host known for boastful, theatrical bilingual segments.',
          style: 'Boisterous and theatrical.',
        },
      },
      tracklist: [
        { type: 'Song', artist: 'Ray Barretto', title: 'Acid', startTime: 1, endTime: 204 },
        { type: 'Song', artist: 'Pete El Conde Rodriguez', title: 'I Like It (I Like It Like That)', startTime: 204, endTime: 465 },
        { type: 'Song', artist: 'Tito Puente', title: 'Oye Como Va', startTime: 465, endTime: 684 },
        { type: 'Song', artist: 'Bobby Valentin & Frankie Hernandez', title: 'Mi Ritmo Es Bueno', startTime: 684, endTime: 852 },
        { type: 'Song', artist: 'Celia Cruz & Johnny Pacheco', title: 'Quimbara', startTime: 852, endTime: 1061 },
        { type: 'Song', artist: 'Hector Lavoe', title: 'Mi Gente', startTime: 1061, endTime: 1265 },
        { type: 'Song', artist: 'Eddie Palmieri & Ismael Quintana', title: 'Revolt/La Libertad, Logico', startTime: 1265, endTime: 1471 },
        { type: 'Song', artist: 'Willie Colon & Hector Lavoe', title: 'El Malo', startTime: 1471, endTime: 1680 },
      ],
    },
    {
      id: 'vcs-vcpr',
      name: 'VCPR',
      logo: vcprLogo,
      audioUrl: null,
      youtubeUrl: 'LDYWoG-l5q4',
      duration: 3660,
      stationMeta: {
        info: {
          genre: 'Public talk radio',
          yearsActiveInLore: '1984-1986',
          city: 'Vice City',
          about:
            'Vice City Public Radio returns in GTA Vice City Stories as the city\'s talk-radio network. The station includes multiple shows such as Bait and Switch, New World Order, Moorehead Rides Again, and Pressing Issues. The format stays satirical and argumentative, but the VCS version broadens the station beyond a single flagship program.',
          shortDescription:
            'VCPR is Vice City\'s satirical public talk network, featuring debates, call-ins, and scripted radio-show parody.',
          notableTraits: ['Multi-program lineup in 1984', 'Talk-only format', 'Public radio satire'],
        },
        host: {
          name: 'Maurice Chavez',
          actor: 'Philip Anthony Rodriguez',
          bio: 'Host of Pressing Issues and one of the key recurring voices on VCPR.',
          style: 'Formal moderation that slowly unravels into chaos.',
        },
      },
      tracklist: [
        { type: 'DJ', artist: 'Maurice Chavez', title: 'Pressing Issues', startTime: 2, endTime: 1056 },
        { type: 'DJ', artist: 'Larry Joe and Bobbie Ray', title: 'Bait and Switch', startTime: 1056, endTime: 1902 },
        { type: 'DJ', artist: 'Narration', title: 'The Time Ranger', startTime: 1902, endTime: 2425 },
        { type: 'DJ', artist: 'Dwayne Thorn', title: 'New World Order', startTime: 2425, endTime: 3177 },
        { type: 'DJ', artist: 'Narration', title: 'Gordon Moorehead Rides Again', startTime: 3177, endTime: 3660 },
      ],
    },
  ],
};
