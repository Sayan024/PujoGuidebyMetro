/**
 * Asian Paints Sharad Shamman 2026: the pujas that reached the final round ("Churanto Porbe Uttirno").
 * Winners had not been announced when this was written (17 October 2026).
 * Source: https://sharadshamman.asianpaints.com/winners_year.htm
 */
export const SHARAD_SHAMMAN_URL = 'https://sharadshamman.asianpaints.com/winners_year.htm';

export interface ShortlistedPuja {
  name: string;
  theme: string;
  about: string;
  themeArtist: string;
  idolArtist: string;
  /** The matching page in this guide, where we have one. */
  pandalId?: string;
}

export const SHARAD_SHAMMAN_2026: ShortlistedPuja[] = [
  {
    name: 'Behala Club',
    theme: 'Tel: The Market of Faith',
    about: 'Oil as faith, commerce, power and geopolitics, with a satirical edge.',
    themeArtist: 'Pradip Das',
    idolArtist: 'Pintu Sikder',
    pandalId: 'behala-club',
  },
  {
    name: "Behala Youngmen's Association",
    theme: 'Chhuti (Holiday)',
    about: 'A “cloud factory” where children play freely and imagine without machines.',
    themeArtist: 'Sanatan Dinda',
    idolArtist: 'Sanatan Dinda',
    pandalId: 'behala-young',
  },
  {
    name: 'Dum Dum Park Bharat Chakra',
    theme: 'Bonger Roth Kotha',
    about: "The story of Bengal's chariots and their wooden craftsmanship.",
    themeArtist: 'Manash Das',
    idolArtist: 'Saikat Basu',
    pandalId: 'dum-dum-park-bharat-chakra',
  },
  {
    name: 'FD Block Sarbojanin',
    theme: 'Nakshi Konar Math',
    about: 'Gond, Madhubani, Pattachitra and Bengali embroidery folk arts woven together.',
    themeArtist: 'Prasanta Pal',
    idolArtist: 'Tapan Majhi',
    pandalId: 'salt-lake-fd-block',
  },
  {
    name: 'Manicktala Chaltabagan Lohapatty',
    theme: 'Nishan: The Mark',
    about: "The Ramnami Samaj's practice of inscribing Ram's name, as an act of faith and resistance.",
    themeArtist: 'Aditi Chakraborty',
    idolArtist: 'Pallab Jana',
    pandalId: 'chaltabagan-lohapatty',
  },
  {
    name: 'Naktala Udayan Sangha',
    theme: 'Kaler Dhwani (Sound of Time)',
    about: 'A black-and-white installation drawn from the Bengali almanac, with Baul singers.',
    themeArtist: 'Anirban Das',
    idolArtist: 'Anirban Das',
    pandalId: 'naktala-udayan-sangha',
  },
  {
    name: 'Netaji Sporting Club',
    theme: 'Nagar Kotha (The Story of a City)',
    about: "Kolkata's history and a 2003 High Court ruling on its founding, with a traditional earthen idol.",
    themeArtist: 'Moloy Roy & Subhomoy Sinha',
    idolArtist: 'Moloy Roy & Subhomoy Sinha',
  },
  {
    name: 'Rajdanga Amra Kajan Kalyan Samity',
    theme: 'Utsarito Aalo (Radiated Light)',
    about: 'A tribute to the painter Gaganendranath Tagore.',
    themeArtist: 'Purnendu Dey',
    idolArtist: 'Purnendu Dey',
    pandalId: 'rajdanga-amra-kajon-kalyan-samity',
  },
  {
    name: 'Rajdanga Naba Uday Sangha',
    theme: 'Shodhan (Purification)',
    about: 'A future of deforestation and artificial oxygen, urging conservation.',
    themeArtist: 'Debasis Barui',
    idolArtist: 'Saikat Giri',
    pandalId: 'rajdanga-naba-uday-sangha',
  },
  {
    name: 'Samaj Sebi Sangha',
    theme: 'Mahapujoy Mahanayak',
    about: 'The cinema world of the 1960s and 70s, recreated as a tribute to Uttam Kumar.',
    themeArtist: 'Biswanath De',
    idolArtist: 'Arighna Saha',
    pandalId: 'samaj-sebi-sangha',
  },
  {
    name: 'Santoshpur Avenue South Club',
    theme: 'Nirmaan Binirmaan (Construction-Deconstruction)',
    about: 'Cycles of ruin and rebuilding.',
    themeArtist: 'Susanta Shibani Paul',
    idolArtist: 'Adhir Pal & Susanta Shibani Paul',
    pandalId: 'santoshpur-avenue-south-club',
  },
  {
    name: 'Yuba Sangha',
    theme: 'Ek Pukur Bhalobasa (A Pond Full of Love)',
    about: "Bengal's disappearing neighbourhood ponds, with the Telipukur pond as a floating canvas.",
    themeArtist: 'Bhabatosh Sutar',
    idolArtist: 'Bhabatosh Sutar',
    pandalId: 'nagerbazar-yuba-sangha',
  },
];
