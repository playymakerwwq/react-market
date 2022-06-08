import * as React from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import { toast, Slide, ToastContainer } from 'react-toastify'

import Profile from './Profile'
import Navbar from './NavbarComponent'
import Footer from './FooterComponent'
// const Market = React.lazy(() => import('./Market'))
import Market from "./Market"
import Basket from './Basket'
import Product from './Product'
import NotFound from './NotFound'
import WelcomePage from './Welcome'
import Login from './Login'
import Register from './Register'

import style from "./component_static/style.module.scss"

import Usersetting from "./interfaces/Clients"
import Products from "./interfaces/Products"

let ToastShowing: any = null;

const Toast = (text: string) => {
    if(!toast.isActive(ToastShowing)){
        ToastShowing = toast(text, {
            position: toast.POSITION.TOP_RIGHT, 
            closeButton: false, 
            progress: 0, 
            autoClose: 1000,
            hideProgressBar: true,
            pauseOnHover: false,
            draggable: true,
            transition: Slide,
            rtl: false,
            className: style.toastContainer,
            bodyClassName: style.toastBody,
            progressClassName: style.toastProgress,
        })
    }
}

type ProductsValues = {
    id: number, title: string, description: string, available: boolean, favorite: boolean, price: number,
    productImage: string, amountInBasket: number,
}

type ProductsArray = {
    products: ProductsValues[]
}

const GetUserProfile = () =>{
    let { id } = useParams();
    if(Usersetting.users[Number(id)]){
        return <Profile usersetting={Usersetting.users[Number(id)]}/>
    } else {
        return <div>oops</div>
    }
}

const ErrorPage = () => {
    return <NotFound/>
}

const clearProducts: ProductsArray = {
    products: []
}

const BasketProducts: ProductsArray = {
    products: []
}

type State = {productsInBasket: ProductsArray, productAmount: number}

export default class App extends React.Component<{}, State>{
    state: State = {
        productsInBasket: BasketProducts,
        productAmount: 1,
    }

    getCookie = (cName: string) => {
        const name = cName + "=";
        const cDecoded = decodeURIComponent(document.cookie); //to be careful
        const cArr = cDecoded .split('; ');
        let res;
        cArr.forEach(val => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        })
        return res;
    }

    setCookieValue = (variable: string, value: string, expDays: number) => {
        let date = new Date()
        date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000)
        const expires = "expires=" + date.toUTCString();
        document.cookie = variable + "=" + value + "; " + expires + "; path=/"
    }

    // componentDidMount(): void {
    //     if(localStorage.getItem("stay_logged") == 'false') {
    //         document.addEventListener("beforeunload", () => {
    //             localStorage.clear()
    //         })
    //     }
    // }

    // componentWillUnmount(): void {
    //     if(localStorage.getItem("stay_logged") == 'false') {
    //         document.addEventListener("beforeunload", () => {
    //             localStorage.clear()
    //         })
    //     }
    // }

    componentDidMount() {
        // console.log(this.getCookie('basket_products'))
        if (this.getCookie('basket_products') != undefined){
            this.setState({
                productsInBasket: JSON.parse(this.getCookie('basket_products')),
            })
        }
    }

    updateBasketProducts = (index: number) => {
        if (BasketProducts.products.includes(Products.products[index])){
            Toast("Item already added to basket!");
        } else {
            if (Products.products[index].available) {
                BasketProducts.products.push(Products.products[index])
                Toast("Item added to basket")
            } else {
                Toast("Item is not available now")
            }
        }
        console.log(this.state.productsInBasket)
        this.setCookieValue('basket_products', JSON.stringify(this.state.productsInBasket), 30)
        return BasketProducts
    }

    clearBasket = () => {
        BasketProducts.products.map((e) => {e.amountInBasket = 1})
        this.state.productsInBasket.products.map((e) => {e.amountInBasket = 1})
        BasketProducts.products = []
        this.setState({productsInBasket: clearProducts, productAmount: 1})
        this.setCookieValue('basket_products', JSON.stringify(clearProducts), 30)
    }

    addItemToBasket = (id: number): void => {
        this.setState({productsInBasket: this.updateBasketProducts(id)})
    }

    updateBasketAmount = (mode: boolean, id: number) => {
        let index = this.state.productsInBasket.products.findIndex(i => i.id == id)
        this.setState({productAmount: this.state.productsInBasket.products[index].amountInBasket}, () => {
            if (mode) {
                if (this.state.productAmount < 99) {
                    this.setState({productAmount: this.state.productAmount += 1})
                }
            } else {
                if (this.state.productAmount > 1){
                    this.setState({productAmount: this.state.productAmount -= 1})
                }
            }
            this.state.productsInBasket.products[index].amountInBasket = this.state.productAmount
            this.setCookieValue('basket_products', JSON.stringify(this.state.productsInBasket), 30)
        })
    }

    GetProductPage = () => {
        let { id } = useParams();
        let values = null;
        Products.products.map((e) => {
            if (e.title == id){
                values = e
            }
        })
        return <Product productValues={values} updateBasket={this.addItemToBasket}/>
    }

    render(){
        // localStorage.clear()
        return(
            <div className={style.page__container}>
                <div className={style.content__wrap}>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<WelcomePage/>}/>
                        <Route path='login' element={<Login/>}/>
                        <Route path='register' element={<Register/>}/>
                        <Route path='profile/:id' element={<GetUserProfile/>}/>
                        <Route path='basket' element={<Basket productsForBasket={this.state.productsInBasket} 
                                                        updateAmount={this.updateBasketAmount}
                                                        clearBasket={this.clearBasket}
                                                        />}/>
                        <Route path='market' element={<Market productList={Products} updateBasket={this.addItemToBasket}/>}/>
                        <Route path='market/product/:id' element={<this.GetProductPage/>}/>
                        <Route path='*' element={<ErrorPage/>}/>
                    </Routes>
                    <ToastContainer/>
                </div>
                <Footer/>
            </div>
        )
    }
}