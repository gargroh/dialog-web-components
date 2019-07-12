/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import { Text } from '@dlghq/react-l10n';
import Radio from '../Radio/Radio';
import RadioGroup from '../Radio/RadioGroup';
import styles from './CreateNewModal.css';

type Props = {
  id: string,
  maxGroupSize: number,
  significantGroupSize: number,
  type: 'group' | 'channel',
  onChange: (value: string, event: SyntheticInputEvent<>) => void,
};

function CreateGroupTypeForm(props: Props) {
  const { id, maxGroupSize, significantGroupSize, type, onChange } = props;

  const groupHint =
    maxGroupSize < significantGroupSize
      ? 'CreateNewModal.group.type.hintCount'
      : 'CreateNewModal.group.type.hintDefault';
  const groupSize =
    maxGroupSize < significantGroupSize ? maxGroupSize : significantGroupSize;

  return (
    <div className={styles.type}>
      <RadioGroup name="type" value={type} onChange={onChange}>
        <Radio value="group" htmlAutoFocus id={`${id}_type_group`}>
          <Text
            id="CreateNewModal.group.type.title"
            className={styles.typeLabel}
          />
        </Radio>
        <Text
          className={styles.typeHint}
          id={groupHint}
          values={{ count: String(groupSize) }}
          tagName="div"
        />
        <br />
        <Radio value="channel" id={`${id}_type_channel`}>
          <Text
            id="CreateNewModal.channel.type.title"
            className={styles.typeLabel}
          />
        </Radio>
        <Text
          className={styles.typeHint}
          id="CreateNewModal.channel.type.hint"
          tagName="div"
        />
      </RadioGroup>
    </div>
  );
}

export default CreateGroupTypeForm;
