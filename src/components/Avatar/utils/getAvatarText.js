/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import { parse, decorators } from '@dlghq/markdown';

function getAvatarText(title: string): string {
  if (title && title.length) {
    const titleContent = parse(title, decorators)[0].content;

    if (typeof titleContent !== 'string') {
      const titleArray = titleContent.reduce(
        (array, { content, highlight }) => {
          if (!highlight) {
            return [...array, ...content.trim().split(' ')];
          }

          return array;
        },
        [],
      );

      if (titleArray.length === 1) {
        return titleArray[0][0] || '#';
      } else if (titleArray.length > 1) {
        return `${titleArray[0][0]}${titleArray[1][0]}`;
      }
    }
  }

  return '#';
}

export default getAvatarText;
