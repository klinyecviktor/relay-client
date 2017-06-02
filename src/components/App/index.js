import React from 'react'
import './app.scss'

const App = (props) => (
    <div className="app">
        Users Email:
        <ul>
            {props.users.map(user => <li key={user.email}>{user.email}</li>)}
        </ul>

        Skins:
        <div>
            {props.skins.map((skin, index) => (
                <div
                    key={index}
                    className="skins"
                >
                    <div>{skin.market_name}</div>
                    <img src={skin.img} alt="" />
                </div>
            ))}
        </div>
    </div>
)

export default App