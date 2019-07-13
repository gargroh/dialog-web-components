/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import { parseInline } from '@dlghq/markdown';
import { emoji } from '@dlghq/markdown/src/decorators';

function getAvatarText(title: string): string {
  const tokens = parseInline(title, [emoji])
    .filter((token) => token.highlight !== 'emoji')
    .map((token) => token.content)
    .join('')
    .trim()
    .split(' ')
    .filter((text) => text !== '');

  const [firstToken, secondToken] = tokens;

  if (firstToken) {
    if (secondToken) {
      return firstToken[0] + secondToken[0];
    }

    return firstToken[0];
  }

  return '#';
}

export default getAvatarText;
