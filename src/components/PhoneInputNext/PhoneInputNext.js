/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import React from 'react';
import { Input, type Size, type Intent } from '@dlghq/dialog-ui';

import type { Country } from '../CountryCodeSelector/utils/countries';
import getCountryByPhone from '../PhoneInput/utils/getCountryByPhone';
import normalize from '../PhoneInput/utils/normalize';
import { getPreferredCountryCodes } from '../../utils/language';

type PhoneInputNextProps = {
  value: string,
  className?: string,
  id?: string,
  name?: string,
  placeholder?: string,
  hint?: string,
  disabled?: boolean,
  autoFocus?: boolean,
  fill?: boolean,
  htmlAutoFocus?: boolean,
  tabIndex?: number,
  size: Size,
  intent: Intent,
  preferredCountryCodes: Array<string>,
  onChange: (value: string, country: ?Country) => mixed,
  onFocus?: (event: SyntheticFocusEvent<HTMLInputElement>) => mixed,
  onBlur?: (event: SyntheticFocusEvent<HTMLInputElement>) => mixed,
};

export function PhoneInputNext(props: PhoneInputNextProps) {
  function handleChange(value: string): void {
    const phone = normalize(value) || '+';
    props.onChange(
      phone,
      getCountryByPhone(phone, props.preferredCountryCodes),
    );
  }

  return (
    <Input
      type="tel"
      value={props.value || '+'}
      id={props.id}
      name={props.name}
      className={props.className}
      size={props.size}
      placeholder={props.placeholder}
      hint={props.hint}
      intent={props.intent}
      fill={props.fill}
      disabled={props.disabled}
      autoFocus={props.autoFocus}
      htmlAutoFocus={props.htmlAutoFocus}
      tabIndex={props.tabIndex}
      onChange={handleChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    />
  );
}

PhoneInputNext.defaultProps = {
  preferredCountryCodes: getPreferredCountryCodes(),
  size: 'normal',
  intent: 'none',
};
