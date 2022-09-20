import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import React, { useState } from 'react';

import { Avatar, BooleanIcon, Button, ButtonAdd, ButtonDelete, ButtonGroup, ButtonMulti, ButtonSave, DialogModal, NotificationsButton, Tabs } from '../';
import { Select } from '../';
import { useAppStyles } from './app.styles';

export function App() {
  const classes = useAppStyles();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '2rem',
        }}
      >
        <Button>primary</Button>
        <Button type="secondary">secondary</Button>
        <Button disabled>look disabled</Button>
        <Button tooltip={{ title: 'with tooltip' }}>with tooltip</Button>
        <Button
          tooltip={{
            title: 'with tooltip diferent placement',
            placement: 'left',
          }}
        >
          with tooltip diferent placement
        </Button>
        <ButtonMulti
          text="Multi"
          actions={[
            {
              text: 'Action 1',
              action: () => alert(1),
            },
            {
              text: 'Action 2',
              action: () => alert(2),
            },
          ]}
        />
      </div>
      <hr />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '2rem',
        }}
      >
        <span>
          Normal
          <br />
          <ButtonAdd />
        </span>
        <span>
          With custom class
          <br />
          <ButtonAdd className={classes.blue} />
        </span>
        <span>
          Disabled
          <br />
          <ButtonAdd disabled={true} />
        </span>
        <span>
          Custom title and icon
          <br />
          <ButtonAdd text="Añadir elemento" icon={<AddIcon />} />
        </span>
        <span>
          With tooltip
          <br />
          <ButtonAdd tooltip={{ title: 'Add element!', placement: 'top' }} />
        </span>
        <span>
          With action
          <br />
          <ButtonAdd
            onClick={() => {
              alert('clicked');
            }}
          />
        </span>
      </div>
      <hr />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '2rem',
        }}
      >
        <span>
          Normal
          <br />
          <ButtonSave />
        </span>
        <span>
          With custom class
          <br />
          <ButtonSave className={classes.blue} />
        </span>
        <span>
          Disabled
          <br />
          <ButtonSave disabled={true} />
        </span>
        <span>
          Custom title and icon
          <br />
          <ButtonSave text="Añadir elemento" icon={<AddIcon />} />
        </span>
        <span>
          With tooltip
          <br />
          <ButtonSave tooltip={{ title: 'Add element!', placement: 'top' }} />
        </span>
        <span>
          With action
          <br />
          <ButtonSave
            onClick={() => {
              alert('clicked');
            }}
          />
        </span>
      </div>
      <hr />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '2rem',
        }}
      >
        <span>
          Normal
          <br />
          <ButtonDelete />
        </span>
        <span>
          With custom class
          <br />
          <ButtonDelete className={classes.blue} />
        </span>
        <span>
          Disabled
          <br />
          <ButtonDelete disabled={true} />
        </span>
        <span>
          Custom title and icon
          <br />
          <ButtonDelete text="Añadir elemento" icon={<AddIcon />} />
        </span>
        <span>
          With tooltip
          <br />
          <ButtonDelete tooltip={{ title: 'Add element!', placement: 'top' }} />
        </span>
        <span>
          With action
          <br />
          <ButtonDelete
            onClick={() => {
              alert('clicked');
            }}
          />
        </span>
      </div>
      <hr />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '2rem',
        }}
      >
        <span>
          With notifications
          <NotificationsButton
            counter={1}
            onClick={() => alert('Notifications button clicked!')}
          ></NotificationsButton>
        </span>
        <span>
          With no new notifications
          <NotificationsButton
            counter={0}
            onClick={() => alert('Notifications button clicked!')}
          ></NotificationsButton>
        </span>
        <span>
          With custom class
          <NotificationsButton
            counter={2}
            className={clsx(classes.yellow, classes.greenBell)}
            onClick={() => alert('Notifications button clicked!')}
          ></NotificationsButton>
        </span>
      </div>
      <hr />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '2rem',
        }}
      >
        <ButtonGroup
          defaultOption={1}
          options={[
            { name: 'Action 1', icon: <AddIcon />, action: () => null },
            { name: 'Action 2', action: () => null },
          ]}
        ></ButtonGroup>
      </div>
      <hr />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '2rem',
        }}
      >
        <Button onClick={() => setOpenModal(true)}>This opens a dialog</Button>

        <DialogModal
          fullWidth
          title={'Modal'}
          description={''}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          buttons={[
            {
              children: <CloseIcon />,
              text: 'Close',
              type: 'secondary',
              onClick: () => setOpenModal(false),
            },
            {
              children: <CloseIcon />,
              text: 'Close',
              type: 'secondary',
              onClick: () => setOpenModal(false),
            },
          ]}
        >
          <p>And this the content</p>
        </DialogModal>
      </div>
      <hr />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '2rem',
        }}
      >
        <Select
          value={1}
          displayEmpty
          required
          validators={['required']}
          errorMessages={['required']}
          onChange={({ target }) => null}
          elements={[
            { value: 1, name: '1' },
            { value: 2, name: '2' },
            { value: 3, name: '3' },
          ]}
        />
      </div>
      <hr />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '2rem',
        }}
      >
        <span>
          Normal:
          <Avatar
            logOutText={'Logout'}
            onLogOut={() => alert('logout!')}
            userName={'Pepito'}
            userThumbnail={null}
            userEmail={'pepito@gmail.com'}
            myAccountText={'My account'}
            onMyAccountClick={() => alert('go to user profile!')}
          />
        </span>
        <span>
          With custom classes:
          <Avatar
            className={clsx(classes.border, classes.toolbar)}
            logOutText={'Logout'}
            onLogOut={() => alert('logout!')}
            userName={'Pepito'}
            userThumbnail={null}
            userEmail={'pepito@gmail.com'}
            myAccountText={'My account'}
            onMyAccountClick={() => alert('go to user profile!')}
          />
        </span>
        <span>
          On click avatar picture:
          <Avatar
            logOutText={'Logout'}
            onLogOut={() => alert('logout!')}
            userName={'Pepito'}
            userThumbnail={null}
            userEmail={'pepito@gmail.com'}
            myAccountText={'My account'}
            onMyAccountClick={() => alert('go to user profile!')}
            onClickAvatarPicture={() => alert('avatar picture clicked!')}
          />
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '2rem',
        }}
      >
        <Tabs
          classNameContent={classes.tabsMinHeight}
          tabs={[
            {
              name: 'Tab1',
              icon: <AddIcon />,
              children: <div>Tab 1</div>,
            },
            {
              name: 'Tab2',
              icon: <AddIcon />,
              children: <div>Tab 2</div>,
            },
            {
              name: 'Tab3',
              icon: <AddIcon />,
              children: <div>Tab 3</div>,
            },
          ]}
        />
      </div>
      <hr />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '2rem',
        }}
      >
        <BooleanIcon condition={true} />
        <BooleanIcon condition={false} />
        <BooleanIcon showOnlyCheck condition={false} />
        <div>
          <span>With tooltip positive:</span>
          <br />
          <BooleanIcon
            trueText={'Text to display when positive'}
            condition={true}
          />
        </div>

        <div>
          <span>With tooltip negative:</span>
          <br />
          <BooleanIcon
          falseText={'Text to display when negative'}
          condition={false}
        />
        </div>
        
      </div>
    </>
  );
}
