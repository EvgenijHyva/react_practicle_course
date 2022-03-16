import { Component  } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import styled from 'styled-components';

const Wrapper = styled.div` 
    display:block;
    margin: 10px auto;
    h2 {
        text-align: center;
        color: ${props => props.color}
    }
`

class ErrorBoundary extends Component {
    // component that catch an error
    state = {
        error: false
    }
    componentDidCatch(err, errorInfo) {
        console.log(err, errorInfo);  
        this.setState({error:true})
    }
    render() {
        const {error} = this.state;
        if (error) {
            return (
                <Wrapper color="orange">
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

export default ErrorBoundary;