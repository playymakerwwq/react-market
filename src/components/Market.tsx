import * as React from "react";
import market_style from "./component_static/market.module.scss"
import ArrowDown from '@mui/icons-material/ArrowDropDown';
const ItemComponent = React.lazy(() => import('./itemComponent'))

type ProductsValues = {
    id: number, title: string, description: string, available: boolean, 
    favorite: boolean, price: number, productImage: string, amountInBasket: number,
}

type ProductsArray = {
    products: ProductsValues[]
}

type Props = {productList: ProductsArray, updateBasket: (id: number) => void}
type State = {productList: ProductsValues[], showAll: boolean, searchString: string}

export default class Market extends React.Component<Props, State>{
    constructor(props: Props){
        super(props)
    }

    state: State = {
        productList: this.props.productList.products,
        showAll: false,
        searchString: "Type here"
    }

    preventEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key == "Enter") {
            document.execCommand('insertHtml', false, "<br>");
            let element = document.getElementsByClassName(`${market_style.search}`)[0] as HTMLElement;
            element.blur()
            return false
        }
    }

    ifProductNotFound = (notFoundElement: HTMLElement) => {
        if (this.state.productList.length == 0){
            notFoundElement.style.display = "flex"
        } else {
            notFoundElement.style.display = "none"
        }
    }

    searchForProducts = () => {
        let notFoundElement = document.getElementsByClassName(`${market_style.main__container_products_not_found}`)[0] as HTMLElement
        if (this.state.searchString != ""){
            let productListBySearch: ProductsArray = {
                products: []
            }
            productListBySearch.products = []

            if (!this.state.showAll){
                this.props.productList.products.map((e) => {
                    if (e.title.includes(this.state.searchString)){
                        productListBySearch.products.push(e)
                    }
                })
            } else {
                this.props.productList.products.map((e) => {
                    if (e.title.includes(this.state.searchString) && e.available == true){
                        productListBySearch.products.push(e)
                    }
                })
            }

            this.setState({productList: productListBySearch.products}, () => this.ifProductNotFound(notFoundElement))
        } else {
            if (!this.state.showAll){
                this.setState({productList: this.props.productList.products}, () => {this.ifProductNotFound(notFoundElement)})
            } else {
                this.setState({productList: this.props.productList.products}, 
                    () => {this.setState({productList: this.showAvailable(true)}); this.ifProductNotFound(notFoundElement)})
            }
        }
    }

    showAvailable = (sorted: boolean) => {
        let updateBasket = this.props.updateBasket
        if (sorted){
            let availableList: ProductsArray = {
                products: []
            };

            availableList.products = []
            this.state.productList.map((e) => {
                if(e.available){
                    availableList.products.push(e)
                }
            })

            return availableList.products
        } else {
            <React.Suspense fallback={<div>Loading...</div>}>
            {
                this.state.productList.map(function(e){
                    return(  
                    <ItemComponent 
                        key={e.id}
                        id={e.id}
                        title={e.title}
                        description={e.description}
                        available={e.available}
                        favorite={e.favorite}
                        price={e.price}
                        productImage={e.productImage}
                        updateBasket={updateBasket}
                    />
                    )
                })
            }
            </React.Suspense>
        }
    }

    toggleAvailable = () => {
        let listOfElements = document.getElementsByClassName(`${market_style.main__container_products}`)[0] as HTMLElement
        let inputIndicator = document.getElementById(`checkAvailable`)
        let notFoundElement = document.getElementsByClassName(`${market_style.main__container_products_not_found}`)[0] as HTMLElement
        if(!this.state.showAll){
            listOfElements.style.justifyContent = "left"
            inputIndicator.style.backgroundColor = "green"

            this.setState({
                productList: this.showAvailable(true),
                showAll: true
            }, () => {this.ifProductNotFound(notFoundElement)})
            
        } else {
            listOfElements.style.justifyContent = "left"
            inputIndicator.style.backgroundColor = "#d5d5d5"
            this.setState({productList: this.props.productList.products, showAll: false}, 
                () => {this.ifProductNotFound(notFoundElement)})
            this.showAvailable(false)
        }
    }

    render(){
        let updateBasket = this.props.updateBasket
        return(
            <section className={market_style.main__container}>
                <div className={market_style.main__container_categories}>
                    <div className={market_style.main__container_categories_search}>
                        <div>
                            <span>Search</span>
                        </div>
                        <input className={market_style.search} 
                        onKeyDown={(e) => this.preventEnter(e)}
                        onChange={(e) => this.setState({searchString: e.currentTarget.value}, () => this.searchForProducts())}
                        type="text"
                        placeholder={this.state.searchString}
                        />
                    </div>
                    <div className={market_style.main__container_categories_settings}>
                        <div className={market_style.main__container_setting}>
                            <span>
                                Filters <ArrowDown/>
                            </span>
                        </div>
                        <div className={market_style.main__container_setting}>
                            <span>
                                Price <ArrowDown/>
                            </span>
                        </div>
                        <div className={market_style.main__container_setting}>
                            <label htmlFor="checkAvailable" 
                            className={market_style.main__container_settings_container}
                            onClick={this.toggleAvailable}>
                                <span>
                                    Available
                                </span>
                            </label>
                            <input type="checkbox" id="checkAvailable" disabled={true}/>
                        </div>
                    </div>
                </div>
                <hr/>

                <div className={market_style.main__container_products}>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        {
                            this.state.productList.map(function(e){
                                return(<ItemComponent 
                                    key={e.id}
                                    id={e.id}
                                    title={e.title}
                                    description={e.description}
                                    available={e.available}
                                    favorite={e.favorite}
                                    price={e.price}
                                    productImage={e.productImage}
                                    updateBasket={updateBasket}
                                />)
                            })
                        }
                        <div className={market_style.main__container_products_not_found}>
                            <div className={market_style.main__container_products_not_found_container}>
                                <div>
                                    <span className={market_style.main__container_products_not_found_title}>Product was not found</span>
                                </div>
                                <div>
                                    <span  className={market_style.main__container_products_not_found_description}>Сheck the product name and availability</span>
                                </div>
                            </div>
                        </div>
                    </React.Suspense>
                </div>
            </section>
        )
    }
}