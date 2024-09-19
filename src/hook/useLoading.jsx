import { useCallback, useEffect, useState } from 'react';

const resources = {
  images: [
    // Navigator
    '/Logo/GreenLogo.png',
    '/Logo/X-logo.svg',
    '/Logo/twitter-logo.svg',
    // BottomNav
    '/Pointers/cursor-icon.png',
    // Cursor
    '/Pointers/cursor.png',
    // Section1
    '/Section1/3dElement.png',
    '/Section1/7007Protocol.svg',
    '/Logo/BlackLogo.png',
    '/Stars/RedStar.png',
    '/Stars/YellowStar.png',
    // Section2
    '/Section2/Cover.gif',
    '/Section2/play.svg',
    '/Section2/close.svg',
    // Section3
    '/Stars/GreenStar.png',
    // Section4
    '/Section4/Img1.png',
    '/Section4/Img2.png',
    '/Section4/Img3.png',
    '/Section4/Img4.png',
    '/Section4/Img5.png',
    '/Section4/Img6.png',
    '/Section4/Img7.png',
    '/Section4/Img8.png',
    '/Section4/circle_black.png', 
    '/Section4/circle_white.png', 
    '/Section4/eth_lg.png', //440 * 547
    '/Section4/eth_sm.png', //299 * 369
    '/Section4/eth_lg_gray.png', //442 * 547
    '/Section4/eth_sm_gray.png', //294 * 355
    
    // Section5
    '/Section5/Frames/Frame1.png',
    '/Section5/Frames/Frame2.png',
    '/Section5/Frames/Frame3.png',
    '/Section5/Frames/Frame4.png',
    '/Section5/Frames/Frame5.png',
    '/Section5/Frames/Frame6.png',
    '/Section5/Frames/Frame7.png',
    '/Section5/Frames/Frame8.png',
    '/Section5/Partners/Partner1.png',
    '/Section5/Partners/Partner2.png',
    '/Section5/Partners/Partner3.png',
    '/Section5/Partners/Partner4.png',
    '/Section5/Partners/Partner5.png',
    '/Section5/Partners/Partner6.png',
    '/Section5/Partners/Partner7.png',
    '/Section5/Partners/Partner8.png',
    // Section6
    '/Section6/page-six-bg.png'
  ],
  videos: [
    '/Section2/clip.mp4',
    '/Section2/full_video.mp4',
  ],
  fonts: [
    {
      family: 'IBM Plex Mono',
      url: '/fonts/IBMPlexMono-Bold.ttf',
      style: 'normal',
      weight: 'bold'
    },
    {
      family: 'IBM Plex Mono Bold Italic',
      url: '/fonts/IBMPlexMono-BoldItalic.ttf',
      style: 'italic',
      weight: 'bold'
    },
  ],
};

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedResources, setLoadedResources] = useState({
    images: [],
    videos: [],
    fonts: [],
  });

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ src, status: 'fulfilled' });
      img.onerror = () => reject({ src, status: 'rejected' });
      img.src = src;
    });
  };

  const loadVideo = (src) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = src;
      video.onloadeddata = () => resolve({ src, status: 'fulfilled' });
      video.onerror = () => reject({ src, status: 'rejected' });
    });
  };

  const loadFont = (font) => {
    return new Promise((resolve, reject) => {
      const fontFace = new FontFace(font.family, `url(${font.url})`, {
        style: font.style,
        weight: font.weight,
      });

      fontFace.load()
        .then(() => {
          document.fonts.add(fontFace);
          resolve({ font, status: 'fulfilled' });
        })
        .catch(() => reject({ font, status: 'rejected' }));
    });
  };

  const loadResources = useCallback(() => {
    setIsLoading(true);

    const imagePromises = resources.images.map(loadImage);
    const videoPromises = resources.videos.map(loadVideo);
    const fontPromises = resources.fonts.map(loadFont);

    Promise.allSettled([...imagePromises, ...videoPromises, ...fontPromises])
      .then((results) => {
        const loadedImages = results.filter(result => result.status === 'fulfilled' && result.value.src).map(result => result.value.src);
        const loadedVideos = results.filter(result => result.status === 'fulfilled' && result.value.src).map(result => result.value.src);
        const loadedFonts = results.filter(result => result.status === 'fulfilled' && result.value.font).map(result => result.value.font);

        setLoadedResources({
          images: loadedImages,
          videos: loadedVideos,
          fonts: loadedFonts,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('resource load error:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadResources();
  }, [loadResources]);

  return { isLoading, resources: loadedResources };
};

export default useLoading;
