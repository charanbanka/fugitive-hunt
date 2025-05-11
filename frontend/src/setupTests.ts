import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // Deprecated
    removeListener: () => {}, // Deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
    fillRect: ()=>{},
    clearRect: ()=>{},
    getImageData: ()=>{},
    putImageData: ()=>{},
    createImageData: ()=>{},
    setTransform: ()=>{},
    drawImage: ()=>{},
    save: ()=>{},
    fillText: ()=>{},
    restore: ()=>{},
    beginPath: ()=>{},
    moveTo: ()=>{},
    lineTo: ()=>{},
    closePath: ()=>{},
    stroke: ()=>{},
    translate: ()=>{},
    scale: ()=>{},
    rotate: ()=>{},
    arc: ()=>{},
    fill: ()=>{},
    measureText: () => ({ width: 0 }),
    transform: ()=>{},
    rect: ()=>{},
    clip: ()=>{},   
  }),
});