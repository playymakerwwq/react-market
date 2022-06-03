import * as React from 'react'
import { BrowserRouter, Routes, Route, useParams, Navigate } from 'react-router-dom'
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
        return BasketProducts
    }

    clearBasket = () => {
        BasketProducts.products.map((e) => {e.amountInBasket = 1})
        this.state.productsInBasket.products.map((e) => {e.amountInBasket = 1})
        BasketProducts.products = []
        this.setState({productsInBasket: clearProducts, productAmount: 1})
    }

    addItemToBasket = (id: number): void => {
        this.setState({productsInBasket: this.updateBasketProducts(id)})
    }

    updateBasketAmount = (mode: boolean, id: number) => {
        let itemIndex = this.state.productsInBasket.products.indexOf(Products.products[id])
        this.setState({productAmount: this.state.productsInBasket.products[itemIndex].amountInBasket}, () => {
            if (mode) {
                this.setState({productAmount: this.state.productAmount += 1})
            } else {
                this.setState({productAmount: this.state.productAmount -= 1})
            }
            this.state.productsInBasket.products[itemIndex].amountInBasket = this.state.productAmount
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
        return(
            <div className={style.page__container}>
                <div className={style.content__wrap}>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<WelcomePage/>}/>
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