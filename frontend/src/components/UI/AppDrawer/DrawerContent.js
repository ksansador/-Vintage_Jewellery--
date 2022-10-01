import React from 'react';
import {Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Typography} from "@mui/material";
import theme from "../../../theme";
import {Link} from "react-router-dom";

const DrawerHeader = styled('div')(({ theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));

const DrawerContent = ({categories}) => {
    return (
        <>
         <DrawerHeader>
            <Typography variant={'h5'}>
                Categories
            </Typography>
         </DrawerHeader>
            <Divider/>
            <List>
                {categories.map(category => (
                    <div key={category._id}>
                        <ListItem >
                            <ListItemButton component={Link} to={`/?category=${category._id}`}>
                                <ListItemText primary={category.title}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                    </div>
                ))}
            </List>
        </>
    );
};

export default DrawerContent;