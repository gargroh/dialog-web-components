/**
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import { getCountries } from '@dlghq/country-codes';

export type Country = {
  code: string,
  flag: ?string,
  alpha: string,
};

const countries: Array<Country> = [];

getCountries().forEach((country) => {
  country.codes.forEach((code) => {
    countries.push({
      code,
      flag: country.emoji,
      alpha: country.alpha,
    });
  });
});

export default countries;
