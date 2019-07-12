### Markdown

```jsx
const text = require('raw-loader!../../fixtures/markdown.md').default;

<Markdown text={text} />;
```

### Links

```jsx
const text = require('raw-loader!../../fixtures/links.md').default;

<Markdown text={text} />;
```

### Emoji only

```jsx
<Markdown text="😀🐱" />
```

### Inline mode

```jsx
<Markdown text="*Hello*, :dog:" inline />
```
