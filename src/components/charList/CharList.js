import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import { hasImage } from "../randomChar/RandomChar";

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        limit: 9
    }
    marvelService = new MarvelService();

    componentDidMount() {
        // call function once when component created
        this.fillCharList();
    }

    onCharListLoaded = (chars) => {
        const charList = [...this.state.charList, ...chars]
        this.setState({charList})
    }

    fillCharList = () => {
        const {limit} = this.state;
        this.marvelService.getCharacters(limit)
            .then(this.onCharListLoaded)
            .catch(console.log)
    };

    render() {
        const {onCharSelected} = this.props
        const { charList } = this.state;
        const CharCards = charList.map(item => {
            const {id, name, thumbnail} = item;

            return (
                <li className="char__item" 
                    title={name} key={id} 
                    data-id={`Character unique id: ${id}`}
                    onClick={() => onCharSelected(id)}>
                    <img src={thumbnail} alt={`Character: ${name}`} style={hasImage(thumbnail)} />
                    <div className="char__name">{name}</div>
                </li>
            )
        });
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {CharCards}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner" onClick={this.fillCharList}>load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;