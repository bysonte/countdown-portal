export interface Photo {
  url: string;
  caption: string;
}

export const TRIP = {
  targetDate: new Date('2026-09-13T08:30:00-03:00'),
  progressStartDate: new Date('2026-01-01T00:00:00-03:00'),

  destination: {
    name: 'Punta Cana',
    country: 'República Dominicana',
    coordinates: [18.672003, -68.415178] as [number, number],
    zoom: 16,
    mapTypeId: 'hybrid' as const,
    markerLabel: '🏨 Meliá Caribe Beach Resort',
    markerDescription: 'Av. Alemania S/N, Punta Cana 23301',
  },

  header: {
    title: 'Me lo merezco!',
    subtitle: 'Sabés lo que me costó llegar hasta acá... ????',
    badge: '✈️  Punta Cana · Sep 2026',
  },

  departureLine: '📅 13 de Septiembre, 2026 · 8:30 AM, la aventura empieza aquí...',

  // Google Photos album shared URL (photos.app.goo.gl/...)
  album: {
    url: '',  // ← pegar aquí la URL del álbum compartido
    label: 'Ver álbum completo en Google Photos',
  },

  music: {
    title: '"Jerusalema"',
    artist: 'Master KG feat. Nomcebo',
    src: '/jerusalema.mp3',
  },

  photos: [
    // Primary background — shown first on load
    { url: '/album/web/MVIMG_20220927_151859.webp', caption: '' },
    // Rest of the album
    { url: '/album/web/00100sPORTRAIT_00100_BURST20220920103349401_COVER.webp', caption: '' },
    { url: '/album/web/00100sPORTRAIT_00100_BURST20220925195953991_COVER.webp', caption: '' },
    { url: '/album/web/00100sPORTRAIT_00100_BURST20220926103514278_COVER.webp', caption: '' },
    { url: '/album/web/00100sPORTRAIT_00100_BURST20220927102343925_COVER.webp', caption: '' },
    { url: '/album/web/00100sPORTRAIT_00100_BURST20220927102423878_COVER.webp', caption: '' },
    { url: '/album/web/DSC_3458_JPG.webp', caption: '' },
    { url: '/album/web/DSC_3552_JPG.webp', caption: '' },
    { url: '/album/web/DSC_3615_JPG.webp', caption: '' },
    { url: '/album/web/DSC_3638_JPG.webp', caption: '' },
    { url: '/album/web/DSC_3643_JPG.webp', caption: '' },
    { url: '/album/web/DSC_3680_JPG.webp', caption: '' },
    { url: '/album/web/DSC_3713_JPG.webp', caption: '' },
    { url: '/album/web/DSC_3734_JPG.webp', caption: '' },
    { url: '/album/web/IMG_20220917_113955.webp', caption: '' },
    { url: '/album/web/IMG_20220922_120408_1_2.webp', caption: '' },
    { url: '/album/web/IMG_2480.webp', caption: '' },
    { url: '/album/web/IMG_2505.webp', caption: '' },
    { url: '/album/web/IMG_2523.webp', caption: '' },
    { url: '/album/web/IMG_2530.webp', caption: '' },
    { url: '/album/web/IMG_2549.webp', caption: '' },
    { url: '/album/web/IMG_2565.webp', caption: '' },
    { url: '/album/web/IMG_2590.webp', caption: '' },
    { url: '/album/web/IMG_2636.webp', caption: '' },
    { url: '/album/web/IMG_2682.webp', caption: '' },
    { url: '/album/web/IMG_2694.webp', caption: '' },
    { url: '/album/web/IMG_2697.webp', caption: '' },
    { url: '/album/web/IMG_2704.webp', caption: '' },
    { url: '/album/web/IMG_2712.webp', caption: '' },
    { url: '/album/web/IMG_2781.webp', caption: '' },
    { url: '/album/web/IMG_2785.webp', caption: '' },
    { url: '/album/web/IMG_2815.webp', caption: '' },
    { url: '/album/web/IMG_2825.webp', caption: '' },
    { url: '/album/web/IMG_2838.webp', caption: '' },
    { url: '/album/web/IMG_2847.webp', caption: '' },
    { url: '/album/web/IMG_2852.webp', caption: '' },
    { url: '/album/web/IMG_2881.webp', caption: '' },
    { url: '/album/web/IMG_5646.webp', caption: '' },
    { url: '/album/web/IMG_5651.webp', caption: '' },
    { url: '/album/web/IMG_5666.webp', caption: '' },
    { url: '/album/web/IMG_5678.webp', caption: '' },
    { url: '/album/web/IMG_5694.webp', caption: '' },
    { url: '/album/web/IMG_5720.webp', caption: '' },
    { url: '/album/web/MVIMG_20220924_165750.webp', caption: '' },
    { url: '/album/web/MVIMG_20220925_195004.webp', caption: '' },
    { url: '/album/web/MVIMG_20220925_202657.webp', caption: '' },
    { url: '/album/web/MVIMG_20220928_080147_2.webp', caption: '' },
    { url: '/album/web/MVIMG_20220928_110927.webp', caption: '' },
    { url: '/album/web/MVIMG_20220928_113600.webp', caption: '' },
    { url: '/album/web/PXL_20230925_113251636.webp', caption: '' },
    { url: '/album/web/PXL_20230925_113316369.webp', caption: '' },
    { url: '/album/web/PXL_20230925_122608275_MV.webp', caption: '' },
    { url: '/album/web/PXL_20230925_142501207_MV.webp', caption: '' },
    { url: '/album/web/PXL_20230925_171732773_MV.webp', caption: '' },
    { url: '/album/web/PXL_20230925_174931044_MV.webp', caption: '' },
    { url: '/album/web/PXL_20230925_175030212_MV.webp', caption: '' },
    { url: '/album/web/PXL_20230926_105758347_MV.webp', caption: '' },
    { url: '/album/web/PXL_20230928_101857040_MV.webp', caption: '' },
    { url: '/album/web/PXL_20230928_102045256_MV.webp', caption: '' },
    { url: '/album/web/PXL_20231001_095738615_MV.webp', caption: '' },
    { url: '/album/web/PXL_20231003_083456343_MV.webp', caption: '' },
    { url: '/album/web/PXL_20231003_101628019_MV.webp', caption: '' },
    { url: '/album/web/PXL_20231003_184844209.webp', caption: '' },
  ] satisfies Photo[],
};
