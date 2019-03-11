```jsx
handleChange = (value) => {
  setState({ value });
  console.debug(value);
};

<CountryCodeSelectorNext
  label={'Country and code'}
  value={state.value}
  onChange={handleChange}
/>;
```
