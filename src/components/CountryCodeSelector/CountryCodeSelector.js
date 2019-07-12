/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import { Text, LocalizationContextType } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import VirtualizedSelect from 'react-virtualized-select';
import styles from './CountryCodeSelector.css';
import CountryCodeSelectorOption from './CountryCodeSelectorOption';
import countries, { type Country } from './utils/countries';
import { getPreferredCountryCode } from '../../utils/language';
import { isCountryMatches } from './utils/isCountryMatches';
import { getCountryName } from '@dlghq/country-codes';

export type CountryCodeSelectorProps = {
  className?: string,
  value: ?Country,
  countries: Array<Country>,
  label: ?string,
  disabled: boolean,
  onChange: (value: Country) => void,
};

class CountryCodeSelector extends PureComponent<CountryCodeSelectorProps> {
  select: ?VirtualizedSelect;

  static contextTypes = {
    l10n: LocalizationContextType,
  };

  static defaultProps = {
    countries,
  };

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
    if (this.select) {
      this.select.focus();
    }
  };

  setSelect = (select: VirtualizedSelect) => {
    this.select = select;
  };

  renderLabel() {
    const { label } = this.props;

    if (!label) {
      return null;
    }

    return (
      <Text
        className={styles.label}
        id={label}
        onClick={this.handleLabelClick}
      />
    );
  }

  render() {
    const {
      l10n: { formatText, locale },
    } = this.context;
    const className = classNames(
      styles.container,
      this.props.className,
      this.props.disabled ? styles.disabled : null,
    );
    const sortedCountries = this.props.countries.sort((country1, country2) => {
      const [countryName1, countryName2]: [string, string] = [
        getCountryName(country1.alpha, locale),
        getCountryName(country2.alpha, locale),
      ];

      return countryName1.localeCompare(countryName2);
    });

    return (
      <div className={className}>
        {this.renderLabel()}
        <VirtualizedSelect
          ref={this.setSelect}
          name="country-code"
          value={this.props.value}
          valueKey="alpha"
          clearable={false}
          optionHeight={40}
          options={sortedCountries}
          placeholder={formatText('CountryCodeSelector.search')}
          noResultsText={formatText('CountryCodeSelector.not_found')}
          disabled={this.props.disabled}
          valueRenderer={CountryCodeSelectorOption.renderValue}
          optionRenderer={CountryCodeSelectorOption.renderOption}
          filterOption={isCountryMatches}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default CountryCodeSelector;
