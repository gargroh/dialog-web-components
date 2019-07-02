```jsx
initialState = {
  online: {
    online: true,
    updateDate: new Date(),
  },
};

const handleSetOnline = () => {
  setState({
    online: {
      online: true,
      updateDate: new Date(),
    },
  });
};

const handleSetOffline = () => {
  setState({
    online: {
      online: false,
      updateDate: new Date(),
    },
  });
};

const updateLastSeen = () => {
  setState({
    online: {
      online: false,
      updateDate: new Date(),
      lastSeen: new Date(),
    },
  });
};

<>
  <div className="styleguide__buttons">
    <Button theme="primary" size="small" onClick={handleSetOnline}>
      Online
    </Button>
    <Button theme="primary" size="small" onClick={handleSetOffline}>
      Offline
    </Button>
    <Button theme="primary" size="small" onClick={updateLastSeen}>
      Change last seen date
    </Button>
  </div>
  <br />
  <UserOnline online={state.online} />
</>;
```
