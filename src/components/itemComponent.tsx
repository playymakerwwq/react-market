import * as React from 'react'
import item_style from './component_static/item.module.scss'

import FavoriteIcon from '@mui/icons-material/Favorite';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { Link } from 'react-router-dom';

type Props = {id: number, title: string, description: string, available: boolean, 
    favorite: boolean, price: number, productImage: string,
    updateBasket: (id: number) => void,
};
type State = {ifFavorite: boolean}

export default class ItemComponent extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
    }

    state:State = {
        ifFavorite: this.props.favorite,
    }

    ifAvailable = () => {
        if (this.props.available){
            return (<span className={item_style.item__container_item_available} 
                style={{ color: 'green' }}>Available</span>)
        } else {
            return (<span className={item_style.item__container_item_available} 
                style={{ color: 'red' }}>Unavailable</span>)
        }
    }

    ifInFavorites = (e: any, action: boolean) => {
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

    buyNow = () => {
        console.log(true)
    }

    render(){
        return(
            <div className={item_style.item__container}>
                <div className={item_style.item__container_preview}>
                    <img src={this.props.productImage} alt="" />
                </div>

                <div className={item_style.item__container_info}>
                    <div className={item_style.item__container_item}>
                        <div className={item_style.item__container_item_title}>
                            <span><Link to={`product/${this.props.title}`}>{this.props.title}</Link></span>
                        </div>
                        <div className={item_style.item__container_item_price}>
                            <span>{this.props.price} rub</span>
                        </div>
                        <div className={item_style.item__container_item_description}>
                            <span>{this.props.description}</span>
                        </div>
                        <div>
                            {this.ifAvailable()}
                        </div>
                    </div>

                    <div className={item_style.item__container_item_actions}>
                        <div>
                            <div className={item_style.item__container_item_actions_addToFavorite}>
                                <button onClick={(e) => this.ifInFavorites(e, true)}
                                onMouseEnter={(e) => this.ifInFavorites(e, false)}
                                onMouseLeave={(e) => e.currentTarget.style.background = "#383232"}>
                                    <FavoriteIcon/>
                                </button>
                            </div>
                            <div className={item_style.item__container_item_actions_addToBasket}>
                                <button onClick={() => {this.props.updateBasket(this.props.id)}}>
                                    add to busket
                                </button>
                            </div>
                        </div>
                        <div className={item_style.item__container_item_actions_buynow}>
                            <button onClick={this.buyNow}>Buy now</button>
                        </div>
                    </div>
                    <ToastContainer/>
                </div>
            </div>
        )
    }
}