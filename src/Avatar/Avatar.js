import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Avatar } from '@material-ui/core';
import { useAvatarStyles } from './avatar.styles';
import { Card, CardContent, Link, Typography } from '@material-ui/core';
const MENU_ID = 'primary-search-account-menu';

export function CustomAvatar({
	id,
	onLogOut,
	userName,
	letters,
	userEmail,
	userThumbnai,
	logOutText,
	myAccountText,
	myAccountLink,
	...props
}) {
	const classes = useAvatarStyles();
	const [anchorEl, setAnchorEl] = useState(null);

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
		<>
			<MenuItem id={id} onClick={handleProfileMenuOpen}>
				<Avatar
					alt={userName}
					src={userThumbnai || ''}
					className={classes.avatarIcon}
				>
					{letters}
				</Avatar>
				<p className={`${classes.text} ${classes.textLeft}`}>{userName}</p>
			</MenuItem>

			<Menu
				anchorEl={anchorEl}
				id={MENU_ID}
				keepMounted
				MenuListProps={{ style: { padding: 0 } }}
				disableAutoFocusItem
				getContentAnchorEl={null}
				{...props}
				open={isMenuOpen}
				onClose={handleMenuClose}
			>
				<Card elevation={0} className={classes.root}>
					<div className={`${classes.grow} ${classes.signOutButton}`}>
						<MenuItem onClick={handleLogOut} className={classes.text}>
							<Typography variant='subtitle1' color='textSecondary'>
								{logOutText || 'logout'}
							</Typography>
						</MenuItem>
					</div>
					<div className={classes.details}>
						<CardContent>
							<Avatar
								alt={userName}
								src={userThumbnai || ''}
								className={`${classes.avatarIcon} ${classes.avatarIconBig}`}
							>
								{letters}
							</Avatar>
						</CardContent>
						<CardContent className={classes.content}>
							<Typography component='h5' variant='h5'>
								{userName}
							</Typography>
							<Typography variant='subtitle1' color='textSecondary'>
								{userEmail}
							</Typography>
							{myAccountLink && (
								<Link href={myAccountLink}>
									{myAccountText || 'My account'}
								</Link>
							)}
						</CardContent>
					</div>
				</Card>
			</Menu>
		</>
	);
}

CustomAvatar.propTypes = {
	id: PropTypes.string,
	onLogOut: PropTypes.func.isRequired,
	userName: PropTypes.string.isRequired,
	letters: PropTypes.string.isRequired,
	userEmail: PropTypes.string.isRequired,
	logOutText: PropTypes.string,
	myAccountText: PropTypes.string,
	myAccountLink: PropTypes.string,
	userThumbnai: PropTypes.string,
};
