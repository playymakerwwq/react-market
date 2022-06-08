import * as React from 'react'
import basket_style from "./component_static/basket.module.scss"

import BasketItemComponent from './BasketItemComponent'

type ProductsValues = {
    id: number, title: string, description: string, available: boolean, favorite: boolean, price: number,
    productImage: string, amountInBasket: number,
}

type ProductsArray = {
    products: ProductsValues[]
}

const ProductsForClear: ProductsArray = {
    products: []
}

type Props = {productsForBasket: ProductsArray, 
    updateAmount: (mode: boolean, id: number) => void,
    clearBasket: () => void,
}

type State = {products: ProductsArray, totalPrice: number, objectsInBusket: number, amountInBasket: number}

export default class Basket extends React.Component<Props, State>{
    state:State = {
        totalPrice: 0,
        objectsInBusket: this.props.productsForBasket.products.length,
        products: this.props.productsForBasket,
        amountInBasket: 1,
    }

    updatePrice = (increase: boolean) => {
        if (increase){
            this.state.products.products.map((e) => {
                this.setState({totalPrice: this.state.totalPrice += e.price / this.state.objectsInBusket})
            })
        } else {
            this.state.products.products.map((e) => {
                this.setState({totalPrice: this.state.totalPrice -= e.price / this.state.objectsInBusket})
            })
        }
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

    clearBasket = () => {
        this.props.clearBasket();
        this.setState({totalPrice: 0, objectsInBusket: 0, products: ProductsForClear, amountInBasket: 1})
    }

    componentDidMount() {
        if (this.getCookie('basket_products') != undefined){
            let arrCookie: ProductsArray = JSON.parse(this.getCookie('basket_products'));
            if (this.state.products.products.length == 0){
                arrCookie.products.map((e) => {
                    this.state.products.products.push(e)
                })
            }
        }

        this.props.productsForBasket.products.map((e) => {
            this.setState({totalPrice: this.state.totalPrice += e.price * e.amountInBasket})
        })
    }

    render(){  
        let updateAmount = this.props.updateAmount
        return(
            <section>
                <div className={basket_style.main__container}>
                    <div className={basket_style.main__container_content}>
                        <div className={basket_style.main__container_content_info}>
                            <h1>Your items</h1>
                            <span>There will be showed all your items that you added to basket</span>
                        </div>
                        <div className={basket_style.main__container_content_items}>
                            {
                                this.state.products.products.map((e) => {
                                    return <BasketItemComponent key={e.id} 
                                    productInfo={e} 
                                    updatePrice={this.updatePrice}
                                    updateAmount={updateAmount}
                                    />
                                }, () => console.log(this.state.products))
                            }
                        </div>
                        <div className={basket_style.main__container_content_submit}>
                            <div className={basket_style.main__container_price}>
                                Total price: {this.state.totalPrice} rub
                            </div>
                            <button onClick={this.clearBasket}>
                                clear
                            </button>
                            <button>
                                buy
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}