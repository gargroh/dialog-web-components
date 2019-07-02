/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import { noop } from 'lodash';
import React from 'react';
import classNames from 'classnames';
import { getCountryName } from '@dlghq/country-codes';
import { L10n } from '@dlghq/react-l10n';

import type { Country } from '../CountryCodeSelector/utils/countries';
import Emoji from '../Emoji/Emoji';
import styles from './CountryCodeSelectorNext.css';

export type CountryCodeSelectorOptionProps = {
  style?: Object,
  country: Country,
  isFocused: boolean,
  isSelected: boolean,
  onFocus: (country: Country) => void,
  onSelect: (country: Country) => void,
};

export function CountryCodeSelectorOption(
  props: CountryCodeSelectorOptionProps,
) {
  const { style, country, isFocused, isSelected } = props;
  const className = classNames(styles.option, {
    [styles.optionFocused]: isFocused,
    [styles.optionSelected]: isSelected,
  });

  function handleClick() {
    props.onSelect(props.country);
  }

  function handleMouseEnter() {
    props.onFocus(props.country);
  }

  return (
    <L10n>
      {({ l10n: { locale } }) => {
        const title = getCountryName(country.alpha, locale);

        return (
          <div
            className={className}
            style={style}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            title={title}
          >
            <div className={styles.optionLabel}>{title}</div>
            <span className={styles.optionCode}>{country.code}</span>
            {country.flag ? (
              <Emoji
                className={styles.optionFlag}
                char={country.flag}
                size={26}
              />
            ) : null}
          </div>
        );
      }}
    </L10n>
  );
}

export function renderOption({
  focusedOption,
  focusOption,
  key,
  option,
  selectValue,
  style,
  valueArray,
}: $FlowIssue) {
  return (
    <CountryCodeSelectorOption
      key={key}
      style={style}
      country={option}
      isFocused={option === focusedOption}
      isSelected={valueArray.indexOf(option) >= 0}
      onFocus={focusOption}
      onSelect={selectValue}
    />
  );
}

export function renderValue(country: Country) {
  return (
    <CountryCodeSelectorOption
      country={country}
      isFocused={false}
      isSelected={false}
      onFocus={noop}
      onSelect={noop}
    />
  );
}
