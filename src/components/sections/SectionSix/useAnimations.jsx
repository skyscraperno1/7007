import { useState, useEffect } from 'react';
function usePosition(btnRef, parentElementId) {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [inset, setInset] = useState('inset(0 0 0 0)');

  useEffect(() => {
    if (btnRef.current === null) return;
    const boxRect = btnRef.current.getBoundingClientRect();
    const parentRect = document.getElementById(parentElementId).getBoundingClientRect();
    const topDistance = boxRect.top - parentRect.top;
    const bottomDistance = parentRect.bottom - boxRect.bottom;
    const leftDistance = boxRect.left - parentRect.left;
    const rightDistance = parentRect.right - boxRect.right;
    const isBig = boxRect.width > 1537;
    const x = (parentRect.width - boxRect.width / 4) / 2 - boxRect.left + parentRect.left + (isBig ? 65 : 0);
    const y = (parentRect.height - boxRect.height) / 2 - boxRect.top + parentRect.top;
    setTranslate({ x, y });
    const insetValues = `inset(${topDistance}px ${rightDistance}px ${bottomDistance}px ${leftDistance}px)`;
    setInset(insetValues);
  }, [btnRef, parentElementId]);

  return { translate, inset };
}

export default usePosition;
