/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Phone, Email } from '@dlghq/dialog-types';
import React from 'react';
import { Text } from '@dlghq/react-l10n';
import styles from '../ActivityProfile.css';

export type ActivityUserProfileContactsProps =
  | {
      type: 'email',
      emails: Array<Email>,
    }
  | {
      type: 'phone',
      phones: Array<Phone>,
    };

export function ActivityUserProfileContacts(
  props: ActivityUserProfileContactsProps,
) {
  switch (props.type) {
    case 'email':
      return (
        <div className={styles.contactContent}>
          <Text
            className={styles.title}
            tagName="div"
            id="ActivityProfile.email"
          />
          {props.emails.map((email) => (
            <div key={email.email} className={styles.contactLinkWrapper}>
              <a href={`mailto:${email.email}`} className={styles.contactLink}>
                {email.email}
              </a>
            </div>
          ))}
        </div>
      );

    case 'phone':
      return (
        <div className={styles.contactContent}>
          <Text
            className={styles.title}
            tagName="div"
            id="ActivityProfile.phone"
          />
          {props.phones.map((phone) => (
            <div key={phone.number} className={styles.contactLinkWrapper}>
              <a href={`tel:${phone.number}`} className={styles.contactLink}>
                {phone.number}
              </a>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}
