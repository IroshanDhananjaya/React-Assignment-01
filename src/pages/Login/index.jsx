import React, {Fragment} from "react";
import {Component} from "react";
import "./style.css";
import {Typography, TextField, Button} from "@mui/material";
import {Link} from "react-router-dom";
import CustomerService from "../../services/CustomerService";
import LocalStorageService from "../../services/LocalStorageService";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginData: {
                username: '',
                password: ''
            },
            open: false,
        }
    }

    loginHandle = async () => {
        let loginData = this.state.loginData;
        let response = await CustomerService.loginCustomer(loginData);
        if (response.status === 200) {
            console.log(response.data.token)
            LocalStorageService.setItem('accessToken', response.data.token)
            return true
        } else {
            alert("Incorrect username & password")
            return false
        }
    }

    routerChange = () => {
        window.open("homepage", "_self")
    }

    render() {
        return (
            <Fragment>
                <div className="login-container">
                    <div className="login-sub-container">
                        <Typography
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "blue",
                            }}
                            variant="h4"
                            gutterBottom
                            component="div"
                        >
                            Login
                        </Typography>
                        <div className="login-text-field-area">
                            <TextField
                                style={{marginBottom: "30px", marginTop: "20px"}}
                                id="outlined-password-input"
                                label="User Name"
                                type="text"
                                autoComplete="current-password"
                                fullWidth
                                onChange={(e) => {
                                    let loginData = this.state.loginData;
                                    loginData.username = e.target.value
                                    this.setState({loginData})
                                }}
                            />
                            <TextField
                                style={{marginBottom: "60px",}}
                                id="outlined-password-input"
                                label="Password"
                                type="Password"
                                autoComplete="current-password"
                                fullWidth
                                onChange={(e) => {
                                    let loginData = this.state.loginData;
                                    loginData.password = e.target.value
                                    this.setState({loginData})
                                }}
                            />
                            <Button
                                style={{marginBottom: "30px", height: "50px", fontSize: "20px", fontWeight: 'bold'}}
                                variant="contained"
                                size="medium"
                                fullWidth
                                onClick={() => {
                                    this.loginHandle().then(bool => {
                                        if (bool) {
                                            this.routerChange()
                                        }
                                    })
                                }}
                            >Login</Button>
                            <Typography
                                variant="h7"
                                gutterBottom
                                component="div"
                            >
                                Do you have not an account
                                <Link to={"user"} style={{textDecoration: 'none', width: '100%'}}>
                                    <Button size="large">Click Here</Button>
                                </Link>
                            </Typography>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Login;
