import product_image from "./images/product.jpg"

type ProductsValues = {
    id: number, title: string, description: string, available: boolean, favorite: boolean, price: number,
    productImage: string, amountInBasket: number,
}

type ProductsArray = {
    products: ProductsValues[]
}

const Products: ProductsArray = {
    products: [
        {id: 0, title: "Product 1", description: "Product's 1 description", 
            available: true, favorite: false, price: 999, productImage: product_image,
            amountInBasket: 1, 
        },

        {id: 1, title: "Product 2", description: "Product's 2 description",
            available: false, favorite: false, price: 999, productImage: product_image,
            amountInBasket: 1,
        },

        {id: 2, title: "Product 3", description: "Product's 3 description", 
            available: true, favorite: false, price: 999, productImage: product_image,
            amountInBasket: 1,
        },

        {id: 3, title: "Product 4", description: "Product's 4 description", 
            available: false, favorite: false, price: 999, productImage: product_image,
            amountInBasket: 1,
        },

        {id: 4, title: "Product 5", description: "Product's 5 description", 
            available: false, favorite: false, price: 999, productImage: product_image,
            amountInBasket: 1,
        }, 

    ]
}

export default Products;