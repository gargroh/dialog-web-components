```jsx
initialState = {
  isOpen: false,
};

const handleClose = () => setState({ isOpen: false });
const handleOpen = () => setState({ isOpen: true });
const handleSubmit = (feedback) => {
  console.debug(feedback);
  handleClose();
};
const handleSaveLogs = () => {
  alert('Logs saved!');
};

<div>
  <Button theme="primary" onClick={handleOpen}>
    Open feedback
  </Button>
  {state.isOpen ? (
    <FeedbackModal
      onClose={handleClose}
      onSubmit={handleSubmit}
      onSaveLogs={handleSaveLogs}
    />
  ) : null}
</div>;
```
