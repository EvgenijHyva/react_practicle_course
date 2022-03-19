import { Component  } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import styled from 'styled-components';

class ErrorBoundary extends Component {
    // component that catch an error
    // preventer can't catch inside eventlisteners, async methods, and errors inside preventer, on server rendering
    state = {
        error: false,
        color: "orange"
    }

    static getDerivatedStateFromError(error) {
        // can only update state nothing else, other operations needed to use in componentDidCatch
        return {error: true};
    }

    componentDidCatch(err, errorInfo) {
        console.log(err, errorInfo);  
        this.setState({error:true}) 
    }
    render() {
        const {error, color} = this.state;
        if (error) {
            return (
                <Wrapper color={color}>
                    <ErrorMessage />
                    <h2>
                        Something went wrong!
                    </h2>
                </Wrapper>
            )
        }
        else {
            return this.props.children;
        }
    }
}

const Wrapper = styled.div` 
    display:block;
    margin: 10px auto;
    h2 {
        text-align: center;
        color: ${props => props.color}
    }
`


export default ErrorBoundary;