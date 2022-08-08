import {Component, Fragment} from "react";
import NavBar from "../NavBar";
import "./style.css";
import CartService from "../../services/CartService";
import ProductService from "../../services/ProductService";
import CustomerService from "../../services/CustomerService";
import LocalStorageService from "../../services/LocalStorageService";
import jwt_decode from "jwt-decode";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: '00',
            carts: '00',
            users: '00',
            username: ''
        }
    }

    setCarts = async () => {
        let response = await CartService.getAllCart();
        if (response.status === 200) {
            this.setState({
                carts: response.data.length
            })
        }
    }

    setProducts = async () => {
        let response = await ProductService.getAllProduct();
        if (response.status === 200) {
            this.setState({
                products: response.data.length
            })

        }
    }

    setUsers = async () => {
        let response = await CustomerService.getAllCustomer();
        if (response.status === 200) {
            this.setState({
                users: response.data.length
            })

        }
    }

    setUsername = async () => {
        const accessToken = await LocalStorageService.getItem('accessToken')
        console.log(accessToken)

        const decoded = jwt_decode(accessToken);
        console.log(decoded)

        this.setState({
            username: decoded.user
        })
    }

    componentDidMount() {
        this.setCarts()
        this.setProducts()
        this.setUsers()
        this.setUsername()
    }

    render() {
        return (
            <Fragment>
                <NavBar username={this.state.username}/>
                <div className="home-container">
                    <div className="home-sub-container">
                        <div className="home-card-div-container">
                            <div className="home-card-div">
                                <h1>PRODUCT</h1>
                                <h1>{this.state.products}</h1>
                            </div>
                            <div className="home-card-div">
                                <h1>CART</h1>
                                <h1>{this.state.carts}</h1>
                            </div>
                            <div className="home-card-div">
                                <h1>USERS</h1>
                                <h1>{this.state.users}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default HomePage;
