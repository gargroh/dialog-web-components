User profile:

```jsx
const cutomProfileSchema = require('../../fixtures/customProfileSchema.js')
  .default;
const { ActivityUserProfile } = require('./ActivityUserProfile.js');
const schema = JSON.stringify(cutomProfileSchema.schema);
const user = {
  name: 'Steve Rodgers',
  nick: 'rodgers',
  about:
    'Steve Rogers was a scrawny fine arts student growing up during the Great Depression. His alcoholic father died when Steve was a child, and his mother passed away from pneumonia after he graduated high school.',
  avatar: null,
  bigAvatar: null,
  placeholder: 'red',
  phones: [
    { number: '+1 234 567 89 00', title: 'Mobile phone' },
    { number: '+1 234 567 89 11', title: 'Mobile phone' },
  ],
  emails: [
    { email: 'cap@america.com', title: 'Home email' },
    { email: 'cap1@america.com', title: 'Home email' },
  ],
  customProfile: JSON.stringify({
    lastName: 'Rodgers 🦐',
    age: 97,
    bio: 'Roundhouse kicking asses since 1940',
    password: 'noneed',
    done: true,
    telephone: '+1 234 567 89 00',
  }),
};
const now = new Date();

const online = {
  online: false,
  lastSeen: now.setMinutes(now.getMinutes() - 45),
  updateDate: now,
};

<div style={{ background: '#fff', width: 320 }}>
  <ActivityUserProfile info={user} online={online} schema={schema} />
</div>;
```

Group profile:

```jsx
const { ActivityGroupProfile } = require('./ActivityGroupProfile.js');

const group = {
  name: 'American Option Buddies',
  shortname: null,
  creator: 'Steve Rodgers',
  about: null,
  avatar: null,
  bigAvatar: null,
  placeholder: 'lblue',
  adminId: 1001,
};
const onAboutEdit = () => console.debug('Edit about action');
const onCreatorClick = () => console.debug('Clicked on creator name');

<div style={{ background: '#fff', width: 320 }}>
  <ActivityGroupProfile
    info={group}
    onAboutEdit={onAboutEdit}
    onCreatorClick={onCreatorClick}
  >
    <div style={{ margin: '0px 5px', display: 'inline-block' }}>
      <IconButton glyph="star" key="more" size="large" />
    </div>
    <div style={{ margin: '0px 5px', display: 'inline-block' }}>
      <IconButton glyph="add_member" key="more" size="large" />
    </div>
    <div style={{ margin: '0px 5px', display: 'inline-block' }}>
      <IconButton glyph="more_outline" key="more" size="large" />
    </div>
  </ActivityGroupProfile>
</div>;
```
