```jsx
const initial = {
  url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
  isOpen: false,
};
initialState = initial;

const handleOpen = () => setState({ isOpen: true });
const handleAccept = () => {
  console.debug('Accept');
  setState(initial);
};
const handleReject = () => {
  console.debug('Reject');
  setState(initial);
};

<div>
  <Button theme="primary" onClick={handleOpen}>
    License Agreement
  </Button>
  {state.isOpen ? (
    <IFrameModal
      url={state.url}
      onAccept={handleAccept}
      onReject={handleReject}
    />
  ) : null}
</div>;
```
