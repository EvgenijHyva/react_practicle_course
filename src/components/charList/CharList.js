import { Component } from 'react';
import PropTypes from "prop-types"

import MarvelService from '../../services/MarvelService';
import { hasImage } from "../randomChar/RandomChar";


import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        limit: 9, 
        newItemsLoading: true,
        offset: 0,
        charsEnded: false,
    }
    marvelService = new MarvelService();
    itemRefs = [];

    setRefs = ref => {
        this.itemRefs.push(ref);
    }

    focusOnItem(id) {
        const pattern = new RegExp(id);
        this.itemRefs.forEach(ref =>  { 
            if (pattern.test(ref.getAttribute("data-id"))) {
                ref.classList.add("char__item_selected")
                ref.focus()
            } else {
                ref.classList.remove("char__item_selected")
            }
        })
    }

    componentDidMount() {
        // call function once when component created
        this.fillCharList();
    }

    onCharListLoaded = (chars) => {
        const { limit } = this.state
        let ended = chars.length < limit ? true : false
        this.setState(({charList, offset}) => ({
            charList: [...charList, ...chars],
            newItemsLoading:false,
            offset: offset + chars.length,
            charsEnded: ended
        }))
    }

    fillCharList = () => {
        const {limit, offset} = this.state;
        this.onCharlistLoading();
        this.marvelService.getCharacters(limit, offset)
            .then(this.onCharListLoaded)
            .catch(console.log)
    };

    onCharlistLoading = () => {
        this.setState({newItemsLoading:true})
    }

    render() {
        const {onCharSelected} = this.props
        const { charList,newItemsLoading, charsEnded } = this.state;
        const CharCards = charList.map(item => {
            const {id, name, thumbnail} = item;

            return (
                <li className="char__item" 
                    title={name} key={id} 
                    data-id={`Character unique id: ${id}`}
                    onClick={() => {
                        onCharSelected(id);
                        this.focusOnItem(id)
                    }}
                    onKeyPress={(e) => {
                        if (e.key === " " || e.key === "Enter")
                        onCharSelected(id);
                        this.focusOnItem(id)
                    }}
                    ref={this.setRefs}
                    >
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
                <button 
                    className="button button__main button__long"
                    disabled={newItemsLoading}
                    onClick={this.fillCharList}
                    style={{"display": charsEnded ? "none" : "block"}}
                    >
                    <div className="inner" >load more {newItemsLoading}</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes={
    onCharSelected: PropTypes.func.isRequired,
}

export default CharList;