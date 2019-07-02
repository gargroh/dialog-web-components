## Emoji List

```jsx
initialState = {
  open: true,
  recent: ['😀', '👻'],
};

const handleOpenClick = () => {
  setState({ open: !state.open });
};

const handleEmojiClick = (emoji) => {
  setState({
    recent: [emoji, ...state.recent.filter((item) => item !== emoji)],
  });
};

<div>
  <Button onClick={handleOpenClick} theme="primary" size="small">
    Toggle
  </Button>
  <hr />
  {state.open ? (
    <EmojiList recent={['😀', '👻']} onClick={console.debug} />
  ) : null}
</div>;
```

## Stickers List

```jsx
const images = require('./fixtures/octodex.json');

const stickers = [];

initialState = {
  open: true,
  recent: ['😀', '👻'],
};

for (let i = 0; i < parseInt(images.length / 7, 10); i++) {
  const start = i * 7;
  const end = start + 7;

  stickers.push({
    id: i,
    title: 'GitHub',
    stickers: images.slice(start, end).map((image, id) => {
      return {
        id,
        image,
        emoji: '😀',
      };
    }),
  });
}

<EmojiList recent={['😀', '👻']} stickers={stickers} onClick={console.debug} />;
```

## Emoji/sticker List with stored position

```jsx
const images = require('./fixtures/octodex.json');

const stickers = [];

initialState = {
  open: true,
  recent: ['😀', '👻'],
  screen: 'emoji',
  scrollTop: {
    emoji: 0,
    stickers: 0,
  },
};

const handleScreenChange = (screen) => {
  setState({ screen });
};

const handleScroll = (screen, scrollTop) => {
  setState({
    scrollTop: {
      ...state.scrollTop,
      [screen]: scrollTop,
    },
  });
};

const handleOpenClick = () => {
  setState({ open: !state.open });
};

const handleEmojiClick = (emoji) => {
  setState({
    recent: [emoji, ...state.recent.filter((item) => item !== emoji)],
  });
};

for (let i = 0; i < parseInt(images.length / 7, 10); i++) {
  const start = i * 7;
  const end = start + 7;

  stickers.push({
    id: i,
    title: 'GitHub',
    stickers: images.slice(start, end).map((image, id) => {
      return {
        id,
        image,
        emoji: '😀',
      };
    }),
  });
}

<div>
  <Button onClick={handleOpenClick} theme="primary" size="small">
    Toggle
  </Button>
  <hr />
  {state.open ? (
    <EmojiList
      recent={['😀', '👻']}
      stickers={stickers}
      onClick={console.debug}
      screen={state.screen}
      scrollTop={state.scrollTop}
      onScreenChange={handleScreenChange}
      onScroll={handleScroll}
    />
  ) : null}
</div>;
```
