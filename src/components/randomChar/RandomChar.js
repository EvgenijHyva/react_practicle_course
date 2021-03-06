import { Component } from 'react';

import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';


class RandomChar extends Component {
    componentDidMount() {
        // call function once when component created
        this.updateChar();
    }

    state = {
        char: {},
        loading: true,
        error: false,
    }
    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false, 
            error:false})
    }

    onCharLoading = () => {
        this.setState({loading: true})
    }

    onError = () => {
        this.setState({
            loading:false, 
            error:true,
        })
    }

    updateChar = () => {
        this.onCharLoading();
        const id = Math.floor(Math.random() * (1011400-1011000) + 1011000 );
        this.marvelService
            .getCharacterByID(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    render() {
        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> :null;
        const spiner = loading ? <Spinner /> : null; 
        const content = !( loading || error ) ? <View char={char} /> : null;
        
        return (
            <div className="randomchar">
                {errorMessage}
                {spiner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const hasImage = (url) => {
    const pattern = /image_not_available/;
    const imageNotFound = pattern.test(url)
    return imageNotFound ? {'objectFit' : 'contain'} : null
}

const View = ({char}) => {
    const { name, description, thumbnail, homepage, wiki} = char;

    return (
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img" style={hasImage(thumbnail)} />
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description} 
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
    )
}

export default RandomChar;
export { hasImage };