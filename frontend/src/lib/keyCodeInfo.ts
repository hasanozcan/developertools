export interface KeyInfo {
  key: string;
  code: string;
  keyCode: number;
  which: number;
  location: number;
  locationDescription: string;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  metaKey: boolean;
}

export function getLocationDescription(location: number): string {
  switch (location) {
    case 0:
      return 'Standard / General';
    case 1:
      return 'Left side (e.g. Left Shift/Ctrl/Alt)';
    case 2:
      return 'Right side (e.g. Right Shift/Ctrl/Alt)';
    case 3:
      return 'Numpad';
    default:
      return 'Standard';
  }
}

export function parseKeyboardEvent(e: KeyboardEvent): KeyInfo {
  return {
    key: e.key === ' ' ? 'Space' : e.key,
    code: e.code,
    keyCode: e.keyCode || e.which,
    which: e.which || e.keyCode,
    location: e.location,
    locationDescription: getLocationDescription(e.location),
    ctrlKey: e.ctrlKey,
    shiftKey: e.shiftKey,
    altKey: e.altKey,
    metaKey: e.metaKey,
  };
}
