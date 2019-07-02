```jsx
initialState = { value: '', country: null };

<>
  <PhoneInputNext
    id="test_phone_input"
    value={state.value}
    onChange={(value, country) => setState({ value, country })}
  />
  <pre>{JSON.stringify(state, null, 2)}</pre>
</>;
```
