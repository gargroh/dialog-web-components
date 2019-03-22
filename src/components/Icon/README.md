Basic Icon:

```jsx
<div>
  <Icon glyph="add_member" />
  <Icon glyph="android" />
  <Icon glyph="apple" />
  <Icon glyph="arrow_back" />
  <Icon glyph="arrow_down" />
  <Icon glyph="arrow_drop_down" />
  <Icon glyph="arrow_drop_up" />
  <Icon glyph="arrow_left" />
  <Icon glyph="arrow_right" />
  <Icon glyph="arrow_up" />
  <Icon glyph="attach_file" />
  <Icon glyph="call" />
  <Icon glyph="call_end" />
  <Icon glyph="call_incoming" />
  <Icon glyph="call_outgoing" />
  <Icon glyph="call_missed" />
  <Icon glyph="call_canceled" />
  <Icon glyph="channel" />
  <Icon glyph="chevron_down" />
  <Icon glyph="chevron_left" />
  <Icon glyph="chevron_right" />
  <Icon glyph="chevron_up" />
  <Icon glyph="close" />
  <Icon glyph="collapse" />
  <Icon glyph="collections" />
  <Icon glyph="delete" />
  <Icon glyph="done" />
  <Icon glyph="edit" />
  <Icon glyph="emoji" />
  <Icon glyph="emoji_activity" />
  <Icon glyph="emoji_flag" />
  <Icon glyph="emoji_food" />
  <Icon glyph="emoji_nature" />
  <Icon glyph="emoji_party" />
  <Icon glyph="emoji_smile" />
  <Icon glyph="emoji_symbols" />
  <Icon glyph="emoji_travel" />
  <Icon glyph="error" />
  <Icon glyph="expand" />
  <Icon glyph="explore" />
  <Icon glyph="extension" />
  <Icon glyph="file_download" />
  <Icon glyph="finder" />
  <Icon glyph="forward" />
  <Icon glyph="group" />
  <Icon glyph="group_add" />
  <Icon glyph="info" />
  <Icon glyph="keyboard_arrow_down" />
  <Icon glyph="keyboard_arrow_left" />
  <Icon glyph="keyboard_arrow_right" />
  <Icon glyph="keyboard_arrow_up" />
  <Icon glyph="link" />
  <Icon glyph="lock" />
  <Icon glyph="logo" />
  <Icon glyph="mail_outline" />
  <Icon glyph="maximize" />
  <Icon glyph="message" />
  <Icon glyph="message_pending" />
  <Icon glyph="message_tick" />
  <Icon glyph="message_tick_double" />
  <Icon glyph="mic" />
  <Icon glyph="mic_material" />
  <Icon glyph="mic_material_off" />
  <Icon glyph="minimize" />
  <Icon glyph="more" />
  <Icon glyph="more_outline" />
  <Icon glyph="new_arrow_back" />
  <Icon glyph="new_arrow_back_small" />
  <Icon glyph="new_attachment" />
  <Icon glyph="new_clear" />
  <Icon glyph="new_collapse" />
  <Icon glyph="new_edit" />
  <Icon glyph="new_emoji_activity" />
  <Icon glyph="new_emoji_flag" />
  <Icon glyph="new_emoji_food" />
  <Icon glyph="new_emoji_nature" />
  <Icon glyph="new_emoji_party" />
  <Icon glyph="new_emoji_recent" />
  <Icon glyph="new_emoji_smile" />
  <Icon glyph="new_emoji_symbols" />
  <Icon glyph="new_emoji_travel" />
  <Icon glyph="new_expand" />
  <Icon glyph="new_forward" />
  <Icon glyph="new_more" />
  <Icon glyph="new_mute" />
  <Icon glyph="new_pin" />
  <Icon glyph="new_plus" />
  <Icon glyph="new_reply" />
  <Icon glyph="new_search" />
  <Icon glyph="new_search_clear" />
  <Icon glyph="new_smile" />
  <Icon glyph="new_trash" />
  <Icon glyph="new_unpin" />
  <Icon glyph="notifications" />
  <Icon glyph="person" />
  <Icon glyph="phone_outline" />
  <Icon glyph="photo_camera" />
  <Icon glyph="pin" />
  <Icon glyph="play_arrow" />
  <Icon glyph="plus" />
  <Icon glyph="plus_outline" />
  <Icon glyph="replay" />
  <Icon glyph="reply" />
  <Icon glyph="rotate_left" />
  <Icon glyph="rotate_right" />
  <Icon glyph="schedule" />
  <Icon glyph="screen_share" />
  <Icon glyph="screen_share_stop" />
  <Icon glyph="search" />
  <Icon glyph="send" />
  <Icon glyph="speech_recognition" />
  <Icon glyph="star" />
  <Icon glyph="star_outline" />
  <Icon glyph="translate" />
  <Icon glyph="tux" />
  <Icon glyph="verified" />
  <Icon glyph="videocam" />
  <Icon glyph="videocam_off" />
  <Icon glyph="volume_off" />
  <Icon glyph="volume_up" />
  <Icon glyph="windows" />
</div>
```

Themed Icons:

```jsx
<div>
  <Icon glyph="logo" theme="primary" />
  <Icon glyph="done" theme="success" />
  <Icon glyph="phone_outline" theme="danger" />
  <Icon glyph="call" theme="info" />
  <Icon glyph="close" theme="warning" />
</div>
```

Inverted Icon:

```jsx
<div>
  <Icon glyph="logo" theme="primary" inverted />
  <Icon glyph="done" theme="success" inverted />
  <Icon glyph="call_end" theme="danger" inverted />
  <Icon glyph="link" theme="info" inverted />
  <Icon glyph="close" theme="warning" inverted />
</div>
```

Sizable icon:

```jsx
<div>
  <Icon glyph="logo" theme="primary" size="small" />
  <Icon glyph="done" theme="success" size="small" inverted />
  <Icon glyph="notifications" theme="info" />
  <Icon glyph="call" theme="danger" inverted />
  <Icon glyph="plus_outline" theme="info" size="large" />
  <Icon glyph="link" theme="warning" size={60} inverted />
</div>
```

Clickable Icon:

```jsx
<div>
  <Icon glyph="logo" theme="primary" inverted onClick={() => {}} />
  <Icon glyph="done" theme="success" onClick={() => {}} />
  <Icon glyph="notifications" theme="danger" inverted onClick={() => {}} />
  <Icon glyph="phone_outline" theme="info" size="large" onClick={() => {}} />
  <Icon
    glyph="person"
    theme="warning"
    size="large"
    inverted
    onClick={() => {}}
  />
</div>
```
