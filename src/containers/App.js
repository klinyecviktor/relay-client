import React, { Component } from 'react'
import {
    QueryRenderer,
    graphql
} from 'react-relay'
import AppComponent from '../components/App'
import environment from '../utils/environment'

const AllUsers = graphql`
    query AppQuery {
        users {
            username,
            about,
            email
        },
        skins(limit: 5) {
            market_name,
            img
        }
    }
`

const App = () => (
    <QueryRenderer
        environment={environment}
        query={AllUsers}
        render={({error, props}) => {
            if (error) {
                return <div>{error.message}</div>
            } else if (props) {
                console.log(props)

                return <AppComponent {...props}/>
            }
            return <div>Loading</div>
        }}
    />
)

export default App