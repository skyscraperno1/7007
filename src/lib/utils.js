import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import gsap from "gsap";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function MoveDir(ref, direction, onComplete = () => {}) {
  switch (direction) {
    case "left":
      gsap.to(ref, { x: -20, opacity: 0.9, onComplete: () => onComplete() });
      break;
    case "up":
      gsap.to(ref, { y: -20, opacity: 0.9, onComplete: () =>  onComplete() });
      break;
    case "right":
      gsap.to(ref, { x: 20, opacity: 0.9, onComplete: () => onComplete() });
      break;
    case "down":
      gsap.to(ref, { y: 20, opacity: 0.9, onComplete: () => onComplete() });
      break;
    case "rightUp":
      gsap.to(ref, { x: 20, y: -20, opacity: 0.9, onComplete: () => onComplete() });
      break;
    case "rightDown":
      gsap.to(ref, { x: 20, y: 20, opacity: 0.9, onComplete: () => onComplete() });
      break;
    default:
      break;
  }
}