/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import type { Offline } from '../UserOnline';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import getDateFnsLocale from '../../../utils/getDateFnsLocale';

export function getUserLastSeenDate(online: Offline): Date {
  const { lastSeen, updateDate } = online;

  if (lastSeen) {
    const delta = differenceInSeconds(updateDate, lastSeen);

    if (delta > 60) {
      return lastSeen;
    }
  }

  return updateDate;
}

export function getUserLastSeen(online: Offline, locale: string): string {
  return distanceInWordsToNow(getUserLastSeenDate(online), {
    addSuffix: true,
    includeSeconds: false,
    locale: getDateFnsLocale(locale),
  });
}
