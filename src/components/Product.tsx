import * as React from 'react'
import product_style from "./component_static/product.module.scss"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ToastContainer, toast, Slide } from 'react-toastify';

type ProductsValues = {
    id: number, title: string, description: string, available: boolean, 
    favorite: boolean, price: number, productImage: string,
    amountInBasket: number,
}

type Props = {productValues: ProductsValues, updateBasket: (id: number) => void}
type State = {ifFavorite: boolean, itemCounter: number}

let ToastShowing: any = null;

const basketToast = (text: string) => {
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
            className: product_style.toastContainer,
            bodyClassName: product_style.toastBody,
            progressClassName: product_style.toastProgress,
        })
    }
}

export default class Product extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
    }

    state: State = {
        ifFavorite: this.props.productValues.favorite,
        itemCounter: this.props.productValues.amountInBasket,
    }

    setCookieValue = (variable: string, value: string, expDays: number) => {
        let date = new Date()
        date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000)
        const expires = "expires=" + date.toUTCString();
        document.cookie = variable + "=" + value + "; " + expires + "; path=/"
    }

    checkAvailable = () => {
        if (this.props.productValues.available){
            return <span 
            style={{color: "green", fontSize: "16px", paddingLeft: "10px"}}>yes</span>
        } else {
            return <span 
            style={{color: "red", fontSize: "16px", paddingLeft: "10px"}}>no</span>
        }
    }

    checkFavorite = (e: any, action: boolean) => {
        if (action){
            let favorite: boolean = this.state.ifFavorite == false ? true : false
            this.setState({ifFavorite: favorite})
        }

        if (this.state.ifFavorite){
            e.currentTarget.style.background = "red"
        } else {
            e.currentTarget.style.background = "green"
        }
    }

    increaseAmount = () => {
        if (this.state.itemCounter < 99){
            this.setState({itemCounter: this.state.itemCounter += 1})
        }
    }

    decreaseAmount = () => {
        if (this.state.itemCounter > 1){
            this.setState({itemCounter: this.state.itemCounter -= 1})
        }
    }

    buyNow = () => {
        if (this.props.productValues.available) {
            console.log(true)
        } else {
            basketToast("This item is not available now")
        }
    }

    addToBasket = () => {
        if (this.props.productValues.available){
            this.props.updateBasket(this.props.productValues.id)
        }
        this.setCookieValue('basket_products', JSON.stringify(this.props), 30)
    }

    render(){
        return(
            <div className={product_style.product__main}>
                <div className={product_style.product__container}>
                    <div className={product_style.product__container_image_preview}>
                        <img src={this.props.productValues.productImage} alt="" />
                    </div>
                    <div className={product_style.product__container_product}>
                        <div className={product_style.product__container_product_baseinfo}>
                            <div className={product_style.product__container_product_title}>
                                {this.props.productValues.title}
                            </div>
                            <div className={product_style.product__container_product_price}>
                                {this.props.productValues.price} rub
                            </div>
                            <div className={product_style.product__container_product_available}>
                                In stock: {this.checkAvailable()}
                            </div>
                        </div>
                        <div className={product_style.product__container_product_actions}>
                            <div className={product_style.product__container_product_buyNow}>
                                <button onClick={this.buyNow}>
                                    <span>Buy now</span>
                                </button>
                            </div>
                            <div className={product_style.product__container_product_addToFavorite}>
                                <button 
                                onClick={(e) => this.checkFavorite(e, true)}
                                onMouseEnter={(e) => this.checkFavorite(e, false)}
                                onMouseLeave={(e) => e.currentTarget.style.background = "#383232"}>
                                    <span>Add to favorites</span>
                                </button>
                            </div>
                            {/* <div className={product_style.product__container_product_addToBasketCounter}>
                                <button onClick={this.decreaseAmount}>
                                    -
                                </button>
                                <div>{this.state.itemCounter}</div>
                                <button onClick={this.increaseAmount}>
                                    +
                                </button>
                            </div> */}
                            <div className={product_style.product__container_product_addToBasket}>
                                <button onClick={this.addToBasket}>
                                    Add to busket
                                </button>
                            </div>
                            <ToastContainer/>
                        </div>
                    </div>
                </div>
                <div className={product_style.product__container_info}>
                    <div className={product_style.product_container_info_description}>
                        <span>{this.props.productValues.description}</span>
                    </div>
                    <div className={product_style.product__container_info_characteristics}>
                        <div className={product_style.product__container_info_characteristics_first_column}>
                            <div>characteristic 1: <span>Something</span></div>
                            <div>characteristic 2: <span>Something</span></div>
                            <div>characteristic 3: <span>Something</span></div>
                        </div>
                        <div className={product_style.product__container_info_characteristics_second_column}>
                            <div>characteristic 4: <span>Something</span></div>
                            <div>characteristic 5: <span>Something</span></div>
                            <div>characteristic 6: <span>Something</span></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}