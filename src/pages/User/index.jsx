import React from "react";
import {Component, Fragment} from "react";
import "./style.css";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip} from "@mui/material";
import CustomerService from "../../services/CustomerService";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            userForm: {
                email: '',
                username: '',
                password: '',
                name: {
                    firstname: '',
                    lastname: '',
                },
                address: {
                    city: '',
                    street: '',
                    number: '',
                    zipcode: '',
                    geolocation: {
                        lat: '',
                        long: ''
                    }
                },
                phone: ''
            },
            btnStatus: 'save',
            data: [],
            loaded: false,
        }
    }

    clearFields = () => {
        this.setState({
            userForm: {
                email: '',
                username: '',
                password: '',
                name: {
                    firstname: '',
                    lastname: '',
                },
                address: {
                    city: '',
                    street: '',
                    number: '',
                    zipcode: '',
                    geolocation: {
                        lat: '',
                        long: ''
                    }
                },
                phone: ''
            },
        });
    };

    userSave = async () => {
        if (this.state.btnStatus === 'save') {
            let userForm = this.state.userForm;
            console.log(userForm)
            let response = await CustomerService.postCustomer(userForm);
            if (response.status === 200) {
                this.setState({
                    loaded: true,
                })
                this.loadAllUsers()
                this.clearFields();
                alert("User Saved Successfully")
            } else {
                alert("User Saving Failed")
            }
        } else {
            let userForm = this.state.userForm;
            let response = await CustomerService.putCustomer(userForm, this.state.id);
            if (response.status === 200) {
                this.setState({
                    loaded: true,
                    btnStatus: 'save'
                })
                this.loadAllUsers()
                this.clearFields();
                alert("User Updated Successfully")
            } else {
                alert("User Updating Failed")
            }
        }
    }

    loadAllUsers = async () => {
        let response = await CustomerService.getAllCustomer();
        if (response.status === 200) {
            this.setState({
                data: response.data
            })
        }
    }

    updateCustomer = (data) => {
        this.setState({
            id: data.id,
            userForm: {
                email: data.email,
                username: data.username,
                password: data.password,
                name: {
                    firstname: data.name.firstname,
                    lastname: data.name.firstname,
                },
                address: {
                    city: data.address.city,
                    street: data.address.street,
                    number: data.address.number,
                    zipcode: data.address.zipcode,
                    geolocation: {
                        lat: data.address.geolocation.lat,
                        long: data.address.geolocation.long
                    }
                },
                phone: data.phone,
            },
            btnStatus: 'update',
        });
    }

    deleteCustomer = async (id) => {
        let response = CustomerService.deleteCustomer(id);
        if (response.status === 200) {
            this.loadAllUsers()
            alert("User Delete Successfully")
        } else {
            alert("User Delete Failed")
        }
    }

    componentDidMount() {
        this.loadAllUsers();
    }

    render() {
        return (
            <Fragment>
                <div className="user-container">
                    <ValidatorForm className="user-sub-detail-container"
                                   ref="form"
                                   onSubmit={this.userSave}
                                   onError={errors => console.log(errors)}>
                        <div className="user-form-title">
                            <Link to={"/"} style={{textDecoration: "none", marginRight: '28%', marginTop: '10px'}}>
                                <Button
                                    style={{
                                        textTransform: "none",
                                        color: "white",
                                        background: "black",
                                        borderRadius: "15px",
                                        marginLeft: "0",
                                        fontSize: "medium",
                                    }}
                                >
                                    back
                                </Button>
                            </Link>
                            <h1 style={{marginRight: '30%'}}>User Registration From</h1>
                        </div>
                        <div className="user-from-detail">
                            <div className="user-form-detail-col1">
                                <div style={{width: '100%'}}>
                                    <TextValidator
                                        id="outlined-basic"
                                        label="First Name"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userForm.name.firstname}
                                        onChange={(e) => {
                                            let userForm = this.state.userForm;
                                            userForm.name.firstname = e.target.value
                                            this.setState({userForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div style={{width: '100%'}}>
                                    <TextValidator
                                        id="outlined-basic"
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userForm.email}
                                        onChange={(e) => {
                                            let userForm = this.state.userForm;
                                            userForm.email = e.target.value
                                            this.setState({userForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div style={{width: '100%'}}>
                                    <TextValidator
                                        id="outlined-basic"
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userForm.password}
                                        onChange={(e) => {
                                            let userForm = this.state.userForm;
                                            userForm.password = e.target.value
                                            this.setState({userForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div style={{width: '100%'}}>
                                    <TextValidator
                                        id="outlined-basic"
                                        label="Street"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userForm.address.street}
                                        onChange={(e) => {
                                            let userForm = this.state.userForm;
                                            userForm.address.street = e.target.value
                                            this.setState({userForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div style={{width: '100%'}}>
                                    <TextValidator
                                        id="outlined-basic"
                                        label="Zip Code"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userForm.address.zipcode}
                                        onChange={(e) => {
                                            let userForm = this.state.userForm;
                                            userForm.address.zipcode = e.target.value
                                            this.setState({userForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div style={{width: '100%'}}>
                                    <TextValidator
                                        id="outlined-basic"
                                        label="Long Value"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userForm.address.geolocation.long}
                                        onChange={(e) => {
                                            let userForm = this.state.userForm;
                                            userForm.address.geolocation.long = e.target.value
                                            this.setState({userForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                            </div>
                            <div className="user-form-detail-col1">
                                <div style={{width: '100%'}}>
                                    <TextValidator
                                        id="outlined-basic"
                                        label="Last Name"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userForm.name.lastname}
                                        onChange={(e) => {
                                            let userForm = this.state.userForm;
                                            userForm.name.lastname = e.target.value
                                            this.setState({userForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div style={{width: '100%'}}>
                                    <TextValidator
                                        id="outlined-basic"
                                        label="User Name"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userForm.username}
                                        onChange={(e) => {
                                            let userForm = this.state.userForm;
                                            userForm.username = e.target.value
                                            this.setState({userForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div style={{width: '100%'}}>
                                    <TextValidator
                                        id="outlined-basic"
                                        label="City"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userForm.address.city}
                                        onChange={(e) => {
                                            let userForm = this.state.userForm;
                                            userForm.address.city = e.target.value
                                            this.setState({userForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div style={{width: '100%'}}>
                                    <TextValidator
                                        id="outlined-basic"
                                        label="Street No"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userForm.address.number}
                                        onChange={(e) => {
                                            let userForm = this.state.userForm;
                                            userForm.address.number = e.target.value
                                            this.setState({userForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div style={{width: '100%'}}>
                                    <TextValidator
                                        id="outlined-basic"
                                        label="Lat Value"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userForm.address.geolocation.lat}
                                        onChange={(e) => {
                                            let userForm = this.state.userForm;
                                            userForm.address.geolocation.lat = e.target.value
                                            this.setState({userForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                                <div style={{width: '100%'}}>
                                    <TextValidator
                                        id="outlined-basic"
                                        label="Mobile No"
                                        variant="outlined"
                                        fullWidth
                                        value={this.state.userForm.phone}
                                        onChange={(e) => {
                                            let userForm = this.state.userForm;
                                            userForm.phone = e.target.value
                                            this.setState({userForm})
                                        }}
                                        validators={['required']}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="user-form-detail-btn">
                            <Button
                                variant="outlined"
                                color="error"
                                size="large"
                                sx={{marginRight: "10px"}}
                                onClick={() => {
                                    this.clearFields()
                                }}
                            >
                                Clear
                            </Button>
                            <Button variant="outlined" size="large" type="submit">
                                {this.state.btnStatus}
                            </Button>
                        </div>
                    </ValidatorForm>

                    <div className="user-sub-table-container">
                        <div className="user-form-title">
                            <h1>Current Users</h1>
                        </div>
                        <div style={{overflow: 'auto'}} className={"user-from-detail"}>
                            <TableContainer style={{width: '100%'}} component={Paper}>
                                <Table aria-label="user table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{color: 'black', fontSize: '15px'}} align="center">First
                                                Name</TableCell>
                                            <TableCell style={{color: 'black', fontSize: '15px'}}
                                                       align="center">Email</TableCell>
                                            <TableCell style={{color: 'black', fontSize: '15px'}}
                                                       align="center">City</TableCell>
                                            <TableCell style={{color: 'black', fontSize: '15px'}}
                                                       align="center">Mobile</TableCell>
                                            <TableCell style={{color: 'black', fontSize: '15px'}}
                                                       align="center">Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            this.state.data.map((row) => (
                                                <TableRow>
                                                    <TableCell style={{fontSize: '15px'}}
                                                               align="center">{row.name.firstname}</TableCell>
                                                    <TableCell style={{fontSize: '15px'}}
                                                               align="center">{row.email}</TableCell>
                                                    <TableCell style={{fontSize: '15px'}}
                                                               align="center">{row.address.city}</TableCell>
                                                    <TableCell style={{fontSize: '15px'}}
                                                               align="center">{row.phone}</TableCell>
                                                    <TableCell style={{fontSize: '15px'}}
                                                               align="center">
                                                        <Tooltip title="Edit">
                                                            <IconButton
                                                                onClick={() => {
                                                                    this.updateCustomer(row);
                                                                }}
                                                            >
                                                                <EditIcon color="primary"/>
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete">
                                                            <IconButton
                                                                onClick={() => {
                                                                    this.deleteCustomer(row.id)
                                                                }}
                                                            >
                                                                <DeleteIcon color="error"/>
                                                            </IconButton>
                                                        </Tooltip></TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

}

export default User;
