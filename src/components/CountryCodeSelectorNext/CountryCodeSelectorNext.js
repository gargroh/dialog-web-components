/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import { Text, L10n } from '@dlghq/react-l10n';
import React, { PureComponent, createRef } from 'react';
import classNames from 'classnames';
import VirtualizedSelect from 'react-virtualized-select';
import { getCountryName } from '@dlghq/country-codes';
import { RefObject } from '@dlghq/dialog-ui';

import type { Country } from '../CountryCodeSelector/types';
import { renderValue, renderOption } from './CountryCodeSelectorOptionNext';
import countries from '../CountryCodeSelector/utils/countries';
import { getPreferredCountryCode } from '../../utils/language';
import { isCountryMatches } from '../CountryCodeSelector/utils/isCountryMatches';
import styles from './CountryCodeSelectorNext.css';

export type CountryCodeSelectorNextProps = {
  className?: string,
  value: ?Country,
  countries: Array<Country>,
  label: ?string,
  disabled: boolean,
  onChange: (value: Country) => void,
};

export class CountryCodeSelectorNext extends PureComponent<CountryCodeSelectorNextProps> {
  select: RefObject<VirtualizedSelect>;

  static defaultProps = {
    countries,
  };

  constructor(props: CountryCodeSelectorNextProps) {
    super(props);

    this.select = createRef();
  }

  componentWillMount() {
    const preferredCountryCode = getPreferredCountryCode();
    if (preferredCountryCode) {
      const currentCountry = this.props.countries.find(
        (country) => country.alpha === preferredCountryCode,
      );
      if (currentCountry) {
        this.props.onChange(currentCountry);
      }
    }
  }

  handleLabelClick = () => {
    if (this.select.current) {
      this.select.current.focus();
    }
  };

  getSortedCountries = (locale: string): Array<Country> => {
    return this.props.countries.sort((country1, country2) => {
      const [countryName1, countryName2]: [string, string] = [
        getCountryName(country1.alpha, locale),
        getCountryName(country2.alpha, locale),
      ];

      return countryName1.localeCompare(countryName2);
    });
  };

  render() {
    const { value, label, disabled } = this.props;
    const className = classNames(
      styles.container,
      {
        [styles.disabled]: this.props.disabled,
      },
      this.props.className,
    );

    return (
      <L10n>
        {({ l10n: { formatText, locale } }) => {
          return (
            <div className={className}>
              {label ? (
                <Text
                  className={styles.label}
                  id={label}
                  onClick={this.handleLabelClick}
                />
              ) : null}
              <VirtualizedSelect
                ref={this.select}
                name="country-code"
                value={value}
                valueKey="alpha"
                clearable={false}
                optionHeight={40}
                options={this.getSortedCountries(locale)}
                placeholder={formatText('CountryCodeSelector.search')}
                noResultsText={formatText('CountryCodeSelector.not_found')}
                disabled={disabled}
                valueRenderer={renderValue}
                optionRenderer={renderOption}
                filterOption={isCountryMatches}
                onChange={this.props.onChange}
              />
            </div>
          );
        }}
      </L10n>
    );
  }
}
