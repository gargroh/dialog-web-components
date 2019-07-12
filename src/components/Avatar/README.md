A component for displaying the user avatar.
If there is no image, it shows the initials from `title` on the gradient background.

```jsx
const { random } = require('lodash');
initialState = {
  withTitle: true,
  withImage: false,
  square: false,
};

<>
  <Button
    size="small"
    onClick={() => setState({ withTitle: !state.withTitle })}
  >
    Toggle title
  </Button>{' '}
  <Button
    size="small"
    onClick={() => setState({ withImages: !state.withImages })}
  >
    Toggle images
  </Button>{' '}
  <Button size="small" onClick={() => setState({ square: !state.square })}>
    Toggle square
  </Button>
  <hr />
  <Avatar
    title={state.withTitle ? 'Valera Kotovski' : null}
    placeholder="empty"
    size={50}
    image={
      state.withImages
        ? `https://picsum.photos/200/200/?${random(1, 20)}`
        : null
    }
    square={state.square}
  />{' '}
  <Avatar
    title={state.withTitle ? 'Hello World' : null}
    placeholder="lblue"
    size={50}
    image={
      state.withImages
        ? `https://picsum.photos/200/200/?${random(1, 20)}`
        : null
    }
    square={state.square}
  />{' '}
  <Avatar
    title={state.withTitle ? 'Bad Timmy' : null}
    placeholder="blue"
    size={50}
    image={
      state.withImages
        ? `https://picsum.photos/200/200/?${random(1, 20)}`
        : null
    }
    square={state.square}
  />{' '}
  <Avatar
    title={state.withTitle ? 'Ashley Simpson' : null}
    placeholder="purple"
    size={50}
    image={
      state.withImages
        ? `https://picsum.photos/200/200/?${random(1, 20)}`
        : null
    }
    square={state.square}
  />{' '}
  <Avatar
    title={state.withTitle ? 'Ray Charles' : null}
    placeholder="red"
    size={50}
    image={
      state.withImages
        ? `https://picsum.photos/200/200/?${random(1, 20)}`
        : null
    }
    square={state.square}
  />{' '}
  <Avatar
    title={state.withTitle ? 'Someone Else' : null}
    placeholder="orange"
    size={50}
    image={
      state.withImages
        ? `https://picsum.photos/200/200/?${random(1, 20)}`
        : null
    }
    square={state.square}
  />{' '}
  <Avatar
    title={state.withTitle ? 'Net Vdohnoveniya' : null}
    placeholder="yellow"
    size={50}
    image={
      state.withImages
        ? `https://picsum.photos/200/200/?${random(1, 20)}`
        : null
    }
    square={state.square}
  />{' '}
  <Avatar
    title={state.withTitle ? 'Vladimir Vladimirovich' : null}
    placeholder="green"
    size={50}
    image={
      state.withImages
        ? `https://picsum.photos/200/200/?${random(1, 20)}`
        : null
    }
    square={state.square}
  />
</>;
```

Avatar change props test:

```jsx
initialState = {
  image: null,
};

const status = ['away', 'unset', 'invisible', 'do_not_disturb'];

const handleImageChange = () => {
  setState({
    image: `https://picsum.photos/500/500/?${Math.floor(Math.random() * 20)}`,
  });
};

const handleImageRemove = () => {
  setState({ image: null });
};

const handleStatusChange = () => {
  setState({ status: status[Math.floor(Math.random() * status.length)] });
};

<div>
  <div className="styleguide__buttons">
    <Button onClick={handleImageChange} theme="primary" size="small">
      Change image
    </Button>{' '}
    <Button
      onClick={handleImageRemove}
      theme="warning"
      size="small"
      disabled={!state.image}
    >
      Remove image
    </Button>{' '}
    <Button onClick={handleStatusChange} theme="primary" size="small">
      Randomize status
    </Button>
  </div>
  <br />
  <Avatar
    placeholder="empty"
    size={150}
    image={state.image}
    title="Valera Kotovski"
    onClick={console.log}
    status={state.status}
  />
</div>;
```
