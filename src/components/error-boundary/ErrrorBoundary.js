import { Component  } from "react";

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
            return <h2>Something went wrong</h2>
        }
        else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;