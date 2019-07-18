/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

const SIZES = {
  small: 18,
  default: 24,
  large: 42,
};

export type IconSize = $Keys<typeof SIZES> | number;

function getIconSize(size: IconSize): number {
  if (typeof size === 'number') {
    return size;
  }

  return SIZES[size];
}

export default getIconSize;
