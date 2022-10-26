import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import Close from '@material-ui/icons/Close';
import Add from '@material-ui/icons/Add';
import { useTheme } from '@material-ui/core/styles';
import { Grid, Tab, Tabs, AppBar, Button } from '@material-ui/core';
import { TabPanel } from './TabPanel';
import { useTabsStyles } from './tabs.styles';

function tabProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

export function CustomTabs({
  tabs,
  onChange,
  defaultPosition = 0,
  classNameContent,
  onAdd,
  onDelete,
  isDynamic = false
}) {
  const [tabPosition, setTabPosition] = useState(defaultPosition);
  const theme = useTheme();
  const classes = useTabsStyles();

  async function addTab() {
    if (!isDynamic) {
      return;
    }
    const position = tabs.length;
    await onAdd(position);
    setTabPosition(position);
  }

  async function deleteTab(e, tabId, positionToDelete) {
    if (!isDynamic) {
      return;
    }

    e.stopPropagation();

    if (tabs.length === 1) {
      return;
    }

    onDelete && (await onDelete(tabId, positionToDelete));

    setTabPosition(prevPosition => {
      if (positionToDelete > prevPosition) {
        return prevPosition;
      } else if (positionToDelete < prevPosition) {
        return prevPosition - 1;
      } else {
        return prevPosition - 1;
      }
    });
  }

  const handleChange = (event, newValue) => {
    setTabPosition(newValue);
    onChange && onChange(event, newValue);
  };

  function renderIconTab(tab, index) {
    if (isDynamic) {
      return deleteTab && index !== 0 && <Close id={tab.id} onClick={e => deleteTab(e, tab.id, index)} />;
    }

    return tab.icon;
  }

  return (
    <>
      <AppBar position="static" color="default">
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} className={classes.root}>
            <Tabs
              className={classes.tabs}
              value={tabPosition}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              scrollButtons="auto"
              variant="scrollable"
            >
              {tabs.map((tab, index) => {
                return (
                  <Tab
                    key={index}
                    classes={
                      isDynamic
                        ? {
                            wrapper: classes.deleteIconWrapper,
                            labelContainer: classes.deleteIconContainer
                          }
                        : ''
                    }
                    className={`${classes.tab} ${tab.withDot ? classes.withDot : ''} ${
                      isDynamic ? classes.dynamicTab : classes.flexTab
                    }
										${tab.className}`}
                    icon={renderIconTab(tab, index)}
                    label={tab.name}
                    {...tabProps({ index })}
                  />
                );
              })}
            </Tabs>
            {onAdd && (
              <Button className={classes.addButton} variant="outlined" onClick={addTab}>
                <Add />
              </Button>
            )}
          </Grid>
        </Grid>
      </AppBar>
      <SwipeableViews
        className={classNameContent}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabPosition}
        onChangeIndex={setTabPosition}
      >
        {tabs.map((tab, index) => {
          return (
            <TabPanel key={index} value={tabPosition} index={index} dir={theme.direction}>
              {tab.children}
            </TabPanel>
          );
        })}
      </SwipeableViews>
    </>
  );
}

CustomTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      icon: PropTypes.node,
      withDot: PropTypes.bool,
      children: PropTypes.node,
      id: PropTypes.string
    })
  ).isRequired,
  onChange: PropTypes.func,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  defaultPosition: PropTypes.number,
  classNameContent: PropTypes.string,
  isDynamic: PropTypes.bool
};
