import * as React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import {logoutUser} from "../../../../store/actions/usersActions";


const UserMenu = ({user}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        color="inherit"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Hello, {user.username}!
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
          <MenuItem onClick={handleClose}>
              <Link to={'/products/new'} style={{color: 'inherit',
                  textDecoration: 'none',
                  '&:hover': {
                      color: 'inherit'
                  }}}>
                  Add product
              </Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
              <Link to={`/?user=${user._id}`} style={{color: 'inherit',
                  textDecoration: 'none',
                  '&:hover': {
                      color: 'inherit'
                  }}}>
                  My products
              </Link>
          </MenuItem>
          <MenuItem onClick={() => dispatch(logoutUser())}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
