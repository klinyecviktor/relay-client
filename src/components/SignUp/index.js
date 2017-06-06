import React, { PureComponent } from 'react'
import './signUp.scss'

class SignUp extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    inputHandler = (e) => {
        const { id, value } = e.target

        this.setState({ [id]: value })
    }

    signUp = () => {
        const { email, password, confirmPassword } = this.state

        this.props.signUp(email, password, confirmPassword)
    }

    render() {
        const { email, password, confirmPassword } = this.state

        return (
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    onChange={this.inputHandler}
                    value={email}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={this.inputHandler}
                    value={password}
                />

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    onChange={this.inputHandler}
                    value={confirmPassword}
                />

                <button onClick={this.signUp}>Sign Up</button>
            </div>
        )
    }
}

export default SignUp