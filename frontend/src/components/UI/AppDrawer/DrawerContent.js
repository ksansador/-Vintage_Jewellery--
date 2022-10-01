import React from 'react';
import {Divider, List, ListItem, ListItemButton, ListItemText, styled, Typography} from "@mui/material";
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
            <Typography variant={'h6'} sx={{margin: '0 0 30px', color: '#576235'}}>
                Categories
            </Typography>
         </DrawerHeader>
            <Divider/>
            <List>
                {categories.map(category => (
                    <div key={category._id}>
                        <ListItem sx={{padding: '10px 0'}} >
                            <ListItemButton component={Link} to={`/?category=${category._id}`}>
                                <ListItemText
                                    primary={category.title}
                                    sx={{textTransform: 'capitalize', padding: '5px 0' }}/>
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