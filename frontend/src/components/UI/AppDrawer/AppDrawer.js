import React, {useEffect} from 'react';
import {CssBaseline, Drawer, IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import DrawerContent from "./DrawerContent";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../../store/actions/categoriesActions";

const drawerWidth = 240;

const AppDrawer = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const dispatch = useDispatch();
    const categories = useSelector(state => state.category.categories);

    useEffect( () => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <CssBaseline/>
            <IconButton
                aria-label='open drawer'
                onClick={handleDrawerToggle}
                edge={'start'}
                sx={{mr: 2, display: {sm: 'none'}}}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer
                variant={'temporary'}
                anchor={'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: {xs: 'block', sm: 'none'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
                }}
            >
                <DrawerContent categories={categories}/>
            </Drawer>

            <Drawer
                variant={'permanent'}
                sx={{
                    display: {xs: 'none', sm: 'block', zIndex: 0, position: 'relative'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                }}
                open
            >
                <DrawerContent  categories={categories}/>
            </Drawer>
        </>
    );
};

export default AppDrawer;