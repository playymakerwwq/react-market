import * as React from 'react'
import smallitem_style from './component_static/smallItem.module.scss'

type ProductsValues = {
    id: number, title: string, description: string, available: boolean, 
    favorite: boolean, price: number, productImage: string,
    amountInBasket: number
}

type Props = {productInfo : ProductsValues, 
    updatePrice: (increase: boolean) => void,
    updateAmount: (mode: boolean, id: number) => void,
}
type State = {itemCounter: number}

// https://qna.habr.com/q/877303

export default class SmallItem extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
    }

    state: State = {
        itemCounter: this.props.productInfo.amountInBasket
    }

    increaseAmount = () => {
        if (this.state.itemCounter < 99){
            this.setState({itemCounter: this.state.itemCounter += 1})
            this.props.updatePrice(true)
        }   
    }

    decreaseAmount = () => {
        if (this.state.itemCounter > 1){
            this.setState({itemCounter: this.state.itemCounter -= 1})
            this.props.updatePrice(false)
        }
    }

    render(){
        return (
            <div className={smallitem_style.smallitem_main}>
                <div className={smallitem_style.smallitem_container}>
                    <div className={smallitem_style.smallitem_image}>
                        <img src={this.props.productInfo.productImage} alt="" />
                    </div>
                    <div>
                        <span>{this.props.productInfo.title}</span>
                    </div>
                    <div>
                        <span>{this.props.productInfo.price} rub</span>
                    </div>
                    <div className={smallitem_style.smallitem_info_amountCounter}>
                        <button onClick={() => {this.decreaseAmount(); this.props.updateAmount(false, this.props.productInfo.id)}}>
                             -
                        </button>
                        <div>{this.state.itemCounter}</div>
                        <button onClick={() => {this.increaseAmount(); this.props.updateAmount(true, this.props.productInfo.id)}}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}