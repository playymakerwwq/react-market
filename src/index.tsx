import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'

import App from "./components/App"

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!)
root.render(
    <BrowserRouter>
            <App/>
    </BrowserRouter>
)

// https://codepen.io/P1N2O/pen/pyBNzX <-- for register page