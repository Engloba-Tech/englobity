import { Avatar, Card, CardContent, Link, Menu, MenuItem, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useAvatarStyles } from './avatar.styles';

export function CustomAvatar({
  onLogOut,
  userName,
  userEmail,
  userThumbnail,
  logOutText,
  myAccountText,
  onMyAccountClick,
  onClickAvatarPicture,
  className,
  onlyAvatar = false,
  ...props
}) {
  const classes = useAvatarStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const letters = userEmail[0]?.toUpperCase() + userEmail[2]?.toUpperCase();

  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleLogOut() {
    handleMenuClose();
    onLogOut();
  }

  return (
    <div className={className}>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Avatar alt={userName} src={userThumbnail || ''} className={classes.avatarIcon}>
          {letters}
        </Avatar>
        {!onlyAvatar && <p className={`${classes.text} ${classes.textLeft}`}>{userName}</p>}
      </MenuItem>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        MenuListProps={{ style: { padding: 0 } }}
        disableAutoFocusItem
        getContentAnchorEl={null}
        {...props}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <Card elevation={0} className={classes.root}>
          <div className={classes.details}>
            <CardContent>
              <Avatar
                alt={userName}
                src={userThumbnail || ''}
                className={`${classes.avatarIcon} ${classes.avatarIconBig}`}
                style={{ cursor: onClickAvatarPicture && 'pointer' }}
                onClick={onClickAvatarPicture && onClickAvatarPicture}
              >
                {letters}
              </Avatar>
            </CardContent>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {userName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {userEmail}
              </Typography>
              {onMyAccountClick && (
                <Link onClick={onMyAccountClick} style={{ cursor: 'pointer' }}>
                  {myAccountText || 'My account'}
                </Link>
              )}
            </CardContent>
          </div>
          <div className={`${classes.grow} ${classes.signOutButton}`}>
            <MenuItem onClick={handleLogOut} className={classes.text}>
              <Typography variant="subtitle1" color="textSecondary">
                {logOutText || 'logout'}
              </Typography>
            </MenuItem>
          </div>
        </Card>
      </Menu>
    </div>
  );
}

CustomAvatar.propTypes = {
  onLogOut: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  logOutText: PropTypes.string,
  myAccountText: PropTypes.string,
  onMyAccountClick: PropTypes.func.isRequired,
  userThumbnail: PropTypes.string,
  onClickAvatarPicture: PropTypes.func,
  className: PropTypes.string,
  onlyAvatar: PropTypes.bool
};
