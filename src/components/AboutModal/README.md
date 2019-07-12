```jsx
const initial = {
  isOpen: false,
  isWebOpen: false,
  isChangeLogOpen: false,
  appName: 'dialog',
  appVersion: '1.10.2',
  updateState: {
    value: 'upToDate',
    pending: false,
    error: null,
  },
};
initialState = initial;

const changeLog = [
  {
    date: '10.04.2019',
    version: '2.3.1',
    changes: {
      ru: ['Улучшена производительность', 'Починены звонки', 'Сделано хорошо'],
      en: ['Greatly improve performance', 'Calls fixed', 'Everithyng okay'],
    },
  },
  {
    date: '09.04.2019',
    version: '2.3.0',
    changes: {
      ru: [
        'Теперь можно использовать видеозвонки',
        'Починены звонки 2.0',
        'Новые нескучные обои',
        'А здесь мы что-то очень долго-долго-долго-долго-долго-долго-долго-долго-долго делалии наконецнаконецнаконецнаконецнаконецнаконецнаконецнаконецнаконец доделали',
      ],
    },
  },
  {
    date: '08.04.2019',
    version: '2.2.9',
    changes: {
      ru: [
        'Как-то так',
        'Снова чинили звонки',
        'С вертухи замержили в мастер',
        'Тут что-то было',
      ],
    },
  },
  {
    date: '07.04.2019',
    version: '2.2.8',
    changes: {},
  },
];

const actions = {
  onClose: () => {
    setState(initial);
  },
  onCheck: () => {
    setState({
      updateState: {
        value: 'upToDate',
        pending: true,
        error: null,
      },
    });

    setTimeout(() => {
      setState({
        updateState: {
          value: 'available',
          pending: true,
          error: null,
        },
      });
    }, 2000);

    setTimeout(() => {
      if (Math.random() > 0.5) {
        setState({
          updateState: {
            value: 'available',
            pending: false,
            error: null,
          },
        });
      } else {
        setState({
          updateState: {
            value: 'available',
            pending: false,
            error: new Error('Update failed'),
          },
        });
      }
    }, 10000);
  },
  onUpdate: () => {
    console.log('Update app');
  },
};

const handleOpen = () => {
  setState({ isOpen: true });
};

const handleWebOpen = () => {
  setState({ isWebOpen: true });
};

const handleChangeLogOpen = () => {
  setState({ isChangeLogOpen: true });
};

<div>
  <Button theme="primary" onClick={handleOpen}>
    Show about
  </Button>
  {state.isOpen ? <AboutModal {...state} {...actions} /> : null}

  <Button theme="primary" onClick={handleWebOpen}>
    Show web about
  </Button>
  {state.isWebOpen ? (
    <AboutModal updatesDisabled={true} {...state} {...actions} />
  ) : null}

  <Button theme="primary" onClick={handleChangeLogOpen}>
    Show change log about
  </Button>
  {state.isChangeLogOpen ? (
    <AboutModal changeLog={changeLog} {...state} {...actions} />
  ) : null}
</div>;
```
