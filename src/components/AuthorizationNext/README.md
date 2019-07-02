### Authorization type selector

```jsx
const { AuthorizationTypeSelector } = require('./AuthorizationTypeSelector');
initialState = {
  type: 'username',
};
const allowed = ['username', 'phone', 'certificate'];
const handleTypeChange = (type) => setState({ type });

<div style={{ margin: 'auto', width: 400 }}>
  <AuthorizationTypeSelector
    type={state.type}
    allowed={allowed}
    onChange={handleTypeChange}
  />
</div>;
```

### Authorization by username

```jsx
const { AuthorizationByUsername } = require('./AuthorizationByUsername');
initialState = {
  step: 'AUTH_STARTED',
  error: null,
};

handleSubmit = (credentials) => {
  setState({ step: 'LOGIN_SENT' });
  setTimeout(() => {
    setState({
      step: 'AUTH_STARTED',
      error: { message: 'something goes wrong!' },
    });
  }, 2000);
};

<>
  <div style={{ margin: 'auto', width: 400 }}>
    <AuthorizationByUsername
      step={state.step}
      error={state.error}
      onSubmit={handleSubmit}
    />
  </div>
</>;
```

### Authorization by phone

```jsx
const { AuthorizationByPhone } = require('./AuthorizationByPhone');
initialState = {
  step: 'AUTH_STARTED',
  error: null,
};

const simulateError = () => {
  setState(({ error }) =>
    error
      ? { error: null }
      : {
          error: {
            message: 'something goes wrong',
          },
        },
  );
};

const handlePhoneSubmit = (phone) => {
  setState({ step: 'LOGIN_SENT', error: null });
  setTimeout(() => {
    setState({ step: 'CODE_REQUESTED' });
  }, 2000);
};

const handleCodeSubmit = (code) => {
  setState({ step: 'CODE_SENT', error: null });
  setTimeout(() => {
    setState({ step: 'SIGNUP_STARTED' });
  }, 2000);
};

const handleInfoSubmit = (info) => {
  setState({ step: 'NAME_SENT', error: null });
  setTimeout(() => {
    setState({ step: 'AUTH_FINISHED' });
  }, 2000);
};

const handleRetry = () => {
  setState({ step: 'AUTH_STARTED' });
};

<>
  <Button onClick={simulateError} size="small" theme="danger">
    Simulate error
  </Button>
  <hr />
  <div style={{ margin: 'auto', width: 400 }}>
    <AuthorizationByPhone
      initialPhoneNumber={'+7123456789'}
      error={state.error}
      step={state.step}
      codeResendTimeout={10}
      onPhoneSubmit={handlePhoneSubmit}
      onCodeSubmit={handleCodeSubmit}
      onInfoSubmit={handleInfoSubmit}
      onCodeResend={console.log}
      onRetry={handleRetry}
    />
  </div>
</>;
```

### Authorization by certificate

```jsx
const { AuthorizationByCertificate } = require('./AuthorizationByCertificate');
initialState = {
  step: 'AUTH_STARTED',
  error: null,
};

const handleSubmit = () => {
  setState({ step: 'LOGIN_SENT' });
  setTimeout(() => {
    setState({
      step: 'AUTH_FINISHED',
      error: { message: 'something goes wrong!' },
    });
  }, 2000);
};

<div style={{ margin: 'auto', width: 400 }}>
  <AuthorizationByCertificate
    step={state.step}
    error={state.error}
    onSubmit={handleSubmit}
  />
</div>;
```
