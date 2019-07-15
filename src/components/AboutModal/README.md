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
      ru: [
        {
          headline: 'Исправленные следующие ошибки приложения:',
          items: [
            'При отсутствии связи не возможно произвести выход из приложения;',
            'Создания ссылки для приглашения в Dialog Enterprise;',
            'Исправлена вёрстка вкладки обзор.',
          ],
        },
        {
          headline: 'Добавлены новые возможности:',
          items: [
            'Отчистки приложения при команде с сервера;',
            'Если при звонке другому абоненту у абонента занято, то пользователю выдаётся уведомление;',
            'Теперь при отправке отчёта о работе прилодения обязательно нудно писать текст сообщения;',
            'Добавлено меню "история версий" в в меню "О Программе";',
            'Добавлено уведомление об отсудствии записывающих устройств при совершении звонка.',
          ],
        },
      ],
      en: [
        {
          headline: 'The following application errors are fixed:',
          items: [
            'In the absence of communication it is not possible to exit the application;',
            'Create a link for an invitation to Dialog Enterprise;',
            'Fixed layout tab review.',
          ],
        },
        {
          headline: 'Added new features:',
          items: [
            'Cleaning the application when a command from the server;',
            'If during a call to another subscriber the subscriber is busy, the user is notified;',
            'Now, when sending a report on the application work, it is necessary to write the text of the message;',
            'Added menu "version history" in the menu "About the Program";',
            'Added notification about the absence of recording devices when making a call.',
          ],
        },
      ],
    },
  },
  {
    date: '09.04.2019',
    version: '2.3.0',
    changes: {
      ru: [
        {
          headline: 'Исправлены следующие ошибки приложения:',
          items: [
            'При отсутствии связи невозможно произвести выход из приложения;',
            'Создания ссылки для приглашения в Dialog Enterprise;',
            'Исправлена вёрстка карточек на вкладке обзор.',
          ],
        },
        {
          headline: 'Добавлены новые возможности:',
          items: [
            'Очистка приложения при команде с сервера;',
            'Если при звонке другому абоненту у абонента занято, то пользователю выдаётся уведомление;',
            'Теперь при отправке отчёта о работе приложения обязательно нужно писать текст сообщения;',
            'Добавлено меню "история версий" в меню "О Программе";',
            'Добавлено уведомление об отсутствии записывающих устройств при совершении звонка.',
          ],
        },
      ],
    },
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
  {!state.isChangeLogOpen ? (
    <AboutModal changeLog={changeLog} {...state} {...actions} />
  ) : null}
</div>;
```
