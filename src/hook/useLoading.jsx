import { useCallback, useEffect, useState } from 'react';

const BASE_URL = import.meta.env.BASE_URL;

export const _resources = {
  images: [
    // Wallet
    `${BASE_URL}Logo/rainbow.svg`,
    `${BASE_URL}Logo/coinbase_wallet.svg`,
    `${BASE_URL}Logo/meta_mask.svg`,
    `${BASE_URL}Logo/wallet_connect.svg`,
    // Navigator
    `${BASE_URL}Logo/GreenLogo.png`,
    `${BASE_URL}Logo/X-logo.svg`,
    `${BASE_URL}Logo/tg-logo.svg`,
    `${BASE_URL}Logo/Discord-logo.svg`,
    // BottomNav
    `${BASE_URL}Pointers/cursor-icon.png`,
    // Cursor
    `${BASE_URL}Pointers/cursor.png`,
    // Section1
    `${BASE_URL}Section1/3dElement.png`,
    `${BASE_URL}Section1/7007Protocol.svg`,
    `${BASE_URL}Logo/BlackLogo.png`,
    `${BASE_URL}Stars/RedStar.png`,
    `${BASE_URL}Stars/YellowStar.png`,
    // Section2
    `${BASE_URL}Section2/Cover.gif`,
    `${BASE_URL}Section2/play.svg`,
    `${BASE_URL}Section2/close.svg`,
    `${BASE_URL}Section2/PlayBtn.png`,
    // Section3
    `${BASE_URL}Stars/GreenStar.png`,
    // Section4
    `${BASE_URL}Section4/Img1.png`,
    `${BASE_URL}Section4/Img2.png`,
    `${BASE_URL}Section4/Img3.png`,
    `${BASE_URL}Section4/Img4.png`,
    `${BASE_URL}Section4/Img5.png`,
    `${BASE_URL}Section4/Img6.png`,
    `${BASE_URL}Section4/Img7.png`,
    `${BASE_URL}Section4/Img8.png`,
    `${BASE_URL}Section4/Img9.png`,
    `${BASE_URL}Section4/circle_black.png`,
    `${BASE_URL}Section4/circle_white.png`,
    `${BASE_URL}Section4/eth_sm.png`,

    // Section5
    `${BASE_URL}Section5/Frames/Frame1.png`,
    `${BASE_URL}Section5/Frames/Frame2.png`,
    `${BASE_URL}Section5/Frames/Frame3.png`,
    `${BASE_URL}Section5/Frames/Frame4.png`,
    `${BASE_URL}Section5/Frames/Frame5.png`,
    `${BASE_URL}Section5/Frames/Frame6.png`,
    `${BASE_URL}Section5/Frames/Frame7.png`,
    `${BASE_URL}Section5/Frames/Frame8.png`,
    `${BASE_URL}Section5/Partners/Partner1.png`,
    `${BASE_URL}Section5/Partners/Partner2.png`,
    `${BASE_URL}Section5/Partners/Partner3.png`,
    `${BASE_URL}Section5/Partners/Partner4.png`,
    `${BASE_URL}Section5/Partners/Partner5.png`,
    `${BASE_URL}Section5/Partners/Partner6.png`,
    `${BASE_URL}Section5/Partners/Partner7.png`,
    `${BASE_URL}Section5/Partners/Partner8.png`,
    // Section6
    `${BASE_URL}Section6/$7007.png`
  ],
  videos: [
    `${BASE_URL}Section2/full_video.mp4`,
  ],
  fonts: [
    {
      family: 'IBM Plex Mono',
      url: `${BASE_URL}fonts/IBMPlexMono-Bold.ttf`,
      style: 'normal',
      weight: 'bold'
    },
    {
      family: 'IBM Plex Mono Bold Italic',
      url: `${BASE_URL}fonts/IBMPlexMono-BoldItalic.ttf`,
      style: 'italic',
      weight: 'bold'
    },
  ],
};

const useLoading = (isMobile) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedResources, setLoadedResources] = useState({
    images: [],
    videos: [],
    fonts: [],
  });
  const [startTime] = useState(Date.now());
  const [estimatedLoadingTime, setEstimatedLoadingTime] = useState(1000);
  const [progress, setProgress] = useState(0);
  const finishLoading = (elapsedTime) => {
    if (elapsedTime < estimatedLoadingTime) {
      setTimeout(() => {
        setIsLoading(false);
      }, estimatedLoadingTime - elapsedTime);
    } else {
      setIsLoading(false);
    }
  };

  const fetchResourceSize = (url) => {
    return fetch(url, { method: 'HEAD' })
      .then(response => parseInt(response.headers.get('Content-Length'), 10))
      .catch(() => 0);
  };

  const loadResource = (loadFunction, srcOrFont, size) => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      loadFunction(srcOrFont)
        .then((result) => {
          const elapsedTime = Date.now() - startTime;
          const speed = size / elapsedTime;
          resolve({ ...result, elapsedTime, speed });
        })
        .catch((error) => {
          const elapsedTime = Date.now() - startTime;
          reject({ ...error, elapsedTime });
        });
    });
  };

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

  const loadResources = useCallback(async () => {
    setIsLoading(true);
    setProgress(0);
   
    const imageSizes = await Promise.all(_resources.images.map(fetchResourceSize));
    const videoSizes = await Promise.all(_resources.videos.map(fetchResourceSize));
    const fontSizes = _resources.fonts.map(() => 0);

    const totalSize = [...imageSizes, ...videoSizes, ...fontSizes].reduce((acc, size) => acc + size, 0);

    const totalResources = _resources.images.length + _resources.videos.length + _resources.fonts.length;
    let loadedResourcesCount = 0;

    const updateProgress = () => {
      loadedResourcesCount += 1;
      setProgress((loadedResourcesCount / totalResources) * 100);
    };
    const loadFontPromises = _resources.fonts.map((font, index) =>
      loadResource(loadFont, font, fontSizes[index])
        .finally(updateProgress)
    );
    const loadImagePromises = _resources.images.map((src, index) =>
      loadResource(loadImage, src, imageSizes[index])
        .finally(updateProgress)
    );
    const loadVideoPromises = _resources.videos.map((src, index) =>
      loadResource(loadVideo, src, videoSizes[index])
        .finally(updateProgress)
    );

    Promise.allSettled([...loadFontPromises, ...loadImagePromises, ...loadVideoPromises])
      .then((results) => {
        const loadedImages = results.filter(result => result.status === 'fulfilled' && result.value.src).map(result => result.value.src);
        const loadedVideos = results.filter(result => result.status === 'fulfilled' && result.value.src).map(result => result.value.src);
        const loadedFonts = results.filter(result => result.status === 'fulfilled' && result.value.font).map(result => result.value.font);

        setLoadedResources({
          images: loadedImages,
          videos: loadedVideos,
          fonts: loadedFonts,
        });

        const successfulResults = results.filter(result => result.status === 'fulfilled');
        const totalSpeed = successfulResults.reduce((acc, curr) => acc + (curr.value ? curr.value.speed : 0), 0);

        const averageSpeed = totalSpeed / successfulResults.length;
        const estimatedTime = totalSize / averageSpeed;
        const _estimatedLoadingTime = Math.max(estimatedTime, 1000);
        setEstimatedLoadingTime(_estimatedLoadingTime);

        const elapsedTime = Date.now() - startTime;
        finishLoading(elapsedTime);
      })
      .catch((error) => {
        console.error('resource load error:', error);
        const elapsedTime = Date.now() - startTime;
        finishLoading(elapsedTime);
      });
  }, [startTime]);

  useEffect(() => {
    if (isMobile && progress >= 90) {
      setProgress(100)
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [isMobile, progress]);

  useEffect(() => {
    loadResources();
  }, [loadResources]);

  return { isLoading, progress, resources: loadedResources, estimatedLoadingTime };
};

export default useLoading;
