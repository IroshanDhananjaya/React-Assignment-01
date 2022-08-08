import React, {Component, Fragment} from "react";
import {AppBar, Button, Tabs, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

class NavBar extends Component {

    render() {
        return (
            <Fragment>
                <AppBar sx={{backgroundColor: 'gray', position: "static", boxShadow: 'none'}}>
                    <Toolbar>
                        <Link to="/homepage" style={{textDecoration: 'none'}}>
                            <Button style={{
                                textTransform: 'none',
                                color: 'black',
                                background: 'white',
                                marginLeft: '5px',
                                fontSize: 'medium'
                            }}>Dashboard</Button> </Link>
                        <Tabs sx={{margin: 'auto', mr: 5, display: 'flex', alignItems: "center"}}>
                            <Link to={"/product"} style={{textDecoration: 'none'}}>
                                <Button style={{
                                    textTransform: 'none',
                                    color: 'black',
                                    background: 'white',
                                    marginLeft: '5px',
                                    fontSize: 'medium'
                                }}>Product</Button>
                            </Link>
                            <Link to={"/cart"} style={{textDecoration: 'none'}}>
                                <Button style={{
                                    textTransform: 'none',
                                    color: 'black',
                                    background: 'white',
                                    marginLeft: '5px',
                                    fontSize: 'medium'
                                }}>Cart</Button>
                            </Link>

                        </Tabs>
                        <Tabs textColor="white" sx={{margin: 'auto', mr: 1, display: 'flex', alignItems: "center"}}>


                            <Link to={"/"} style={{textDecoration: 'none'}}>
                                <Button style={{
                                    textTransform: 'none',
                                    color: 'white',
                                    background: 'blue',

                                    marginLeft: '5px',
                                    fontSize: 'medium'
                                }}>Logout</Button>
                            </Link>
                        </Tabs>
                    </Toolbar>
                </AppBar>
            </Fragment>
        )
    }

}

export default NavBar
