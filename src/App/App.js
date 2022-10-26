import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';

import { AlertIcon, Avatar, BooleanIcon, Button, ButtonAdd, ButtonDelete, ButtonGroup, ButtonMulti, ButtonSave, DialogModal, ErrorSummary, errorToaster, InfoIcon, InfoSummary, infoToaster, NotificationsButton, SuccessSummary, successToaster, Tabs, ViewTable, WarningIcon, WarningSummary, warningToaster } from '../';
import { Select } from '../';
import { useAppStyles } from './app.styles';
import { useReceivedInvoiceLineBuildTable } from './useReceivedInvoiceLineBuildTable';

export function App() {
  const classes = useAppStyles();
  const [openModal, setOpenModal] = useState(false);

  const onSelect = () => {
    alert('lol');
  };
  
  const data = useRef([
    {
      id: '9eb5e5b5-abc9-4eb7-a5ec-579499ca8c42',
      externalReference: '965F327C-3064-4B6C-B84B-84B244CF4AAD',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 289,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0001 | PACK 1:  Retirada de enseres, Limpieza, Desenganche de suministros, Fotos del antes y del después y  Descerraje y cambio de bombín.',
      isTaxExempt: false
    },
    {
      id: '80b96bde-57a7-44fd-a66f-604f5223bd54',
      externalReference: '860EDC2E-8EEC-4F6C-8682-D52C088C6AAE',
      districtId: '727558c5-7999-4b76-946e-06b6d44af4f3',
      quantity: 1,
      amount: 391,
      description: 'OK_AD-0001/2022 | CAS-1 | OKUANT_0025 | Pintura vivienda hasta 80 m2',
      isTaxExempt: false
    }
  ]);

  const { rows, headCells, getReceivedInvoiceLines } = useReceivedInvoiceLineBuildTable(
    data.current,
    onSelect,
    false
  );

  return (
    <>
      {/* <div
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
        <AlertIcon />
        <WarningIcon />
        <InfoIcon />
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '2rem',
        }}
      >
        <Button
          onClick={() => errorToaster('Error!', 'This is an error toast')}
        >
          Error!
        </Button>
        <Button
          onClick={() =>
            errorToaster('Multiline Error!', [
              'This is a',
              'multi line',
              'error toast.',
            ])
          }
        >
          Multiline Error!
        </Button>
        <Button
          onClick={() => successToaster('Success!', 'This is success toast')}
        >
          Success!
        </Button>
        <Button onClick={() => infoToaster('Success!')}>Info!</Button>
        <Button onClick={() => warningToaster('Success!')}>Warning!</Button>
      </div>
      <div
        style={{
          margin: '2rem',
        }}
      >
        <br />
        <SuccessSummary text={'This is a success summary'} />
        <br />
        <ErrorSummary text={'This is a error summary'} />
        <br />
        <WarningSummary text={'This is a warning summary'} />
        <br />
        <InfoSummary text={'This is a info summary'} />
        <br />
        <InfoSummary
          className={classes.customInfoSummary}
          text={'This is a info summary with custom class'}
        />
      </div> */}
      <div
        style={{
          margin: '2rem',
        }}
      >
        <ViewTable
          rows={rows}
          cells={headCells}
          // allowRowToggling={false}
          // disableOrderBy={chapterMode}
          // isToggled={isToggled}
          // onToggleElement={onToggleElement}
          onFetchData={getReceivedInvoiceLines}
          checkRowWhen={element => element.canBeDeleted}
          checkRowDisabledReason={'disabled'}
          // allowRowChecking={false}
          // onCheckElement={onCheckElement}
          // onCheckAllElements={onCheckAllElements}
          // checkedElements={checkedElements}
          emptyText={'no results!'}
          nextIconButtonText={'nexttt'}
        />
      </div>
    </>
  );
}
