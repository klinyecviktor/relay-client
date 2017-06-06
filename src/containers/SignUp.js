import React from 'react'
import {
    commitMutation,
    graphql
} from 'react-relay'
import SignUp from '../components/SignUp'
import environment from '../utils/environment'

const mutation = graphql`
    mutation SignUpMutation($input: SignUpInput) {
        signupWithEmailAndPassword (
            input: $input
        ) {
            success,
            message
        }
    }
`

const signUp = (email, password, confirmPassword) => commitMutation(
    environment,
    {
        mutation,
        variables: {
            email,
            password,
            confirmPassword
        }
    }
)



const SignUpContainer = () => (
    <SignUp signUp={signUp} />
)

export default SignUpContainer