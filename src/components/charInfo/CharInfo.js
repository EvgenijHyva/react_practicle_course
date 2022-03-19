import { Component } from 'react';
import PropTypes from "prop-types";

import './charInfo.scss';

import { hasImage } from "../randomChar/RandomChar";

import MarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false,
    }    
    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId)
            this.updateChar();
    }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) {
            return;
        }
        this.onCharLoading();
        this.marvelService.getCharacterByID(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharLoaded = (char) => {
        this.setState({char, loading: false})
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

    render () {
        const {char, loading, error} = this.state;
        
        const skeleton = char || loading || error ? null : <Skeleton />; 
        const errorMessage = error ? <ErrorMessage /> :null;
        const spiner = loading ? <Spinner /> : null; 
        const content = !( loading || error || !char ) ? <View char={char} /> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spiner}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics } = char;    
    return (
        <>
        <div className="char__basics">
                    <img src={thumbnail} alt={name} title={`Character: ${name}`} style={hasImage(thumbnail)} />
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {
                        !comics.length ? <b>Character {name} have no comics story yet</b> : comics.map((item, index) => {
                            // eslint-disable-next-line
                            return (
                                <li className="char__comics-item" key={index}>
                                    {item.name}
                                </li>
                            )
                        })
                    }
                </ul>
        </>
    )
}
CharInfo.propTypes = {
    charId: PropTypes.number, 
}

export default CharInfo;