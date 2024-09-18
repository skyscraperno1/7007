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
  ],
  videos: [
    '/Section2/clip.mp4',
  ],
  fonts: [
    {
      family: 'IBM Plex Mono',
      url: '/src/assets/fonts/IBMPlexMono-Bold.ttf',
      style: 'normal',
      weight: 'bold'
    },
    {
      family: 'IBM Plex Mono Bold Italic',
      url: '/src/assets/fonts/IBMPlexMono-BoldItalic.ttf',
      style: 'italic',
      weight: 'bold'
    },
  ],
};

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedResources, setLoadedResources] = useState(null);

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  };

  const loadVideo = (src) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.src = src;
      video.onloadeddata = resolve;
      video.onerror = reject;
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
          resolve();
        })
        .catch(reject);
    });
  };

  const loadResources = useCallback(() => {
    setIsLoading(true);

    const imagePromises = resources.images.map(loadImage);
    const videoPromises = resources.videos.map(loadVideo);
    const fontPromises = resources.fonts.map(loadFont);

    Promise.all([...imagePromises, ...videoPromises, ...fontPromises])
      .then(() => {
        setLoadedResources(resources);
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
