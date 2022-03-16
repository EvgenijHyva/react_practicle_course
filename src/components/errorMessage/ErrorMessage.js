import "./ErrorMessage.scss";
import imgLink from "./error.gif";


const ErrorMessage = () => {
    // src={process.env.PUBLIC_URL + "/error.gif"}
    return (
        <img src={imgLink} alt="Error occured" className="error-message" />
    )
}

export default ErrorMessage;