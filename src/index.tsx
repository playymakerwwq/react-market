import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from "./components/App"

// ReactDOM.render(
//     <BrowserRouter>
//         <App/>
//     </BrowserRouter>,
// document.getElementById('root'))
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!)
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)

// https://codepen.io/P1N2O/pen/pyBNzX <-- for register page