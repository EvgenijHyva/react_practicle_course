import axios from "axios";

class MarvelService {
    constructor() {
        this.config = {
            responseEncoding: 'utf8',
            responseType: 'json',
            url: '',
            method: 'get' 
        }; 
        this.offset = 0;
    }
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=2f256236a0d304584b979a58bc9ce4c0";
    //_apiPrivateKey = "fb687c848495ac35c5e96c560fa8bae8146e2b6f";

    getResource = async (url) => {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Could not featch ${url}, status: ${response.status}`)
        }
        else {
            return await response.json();
        }
    }

    getByAxios = async (url) => {
        this.config.url = url;
        let response = await axios(this.config)
        if (response.statusText === 'OK')
            return response.data
        throw new Error(`Could not featch ${url}, status: ${response.status}`)
    } 

    getCharacters = async (limit) => {
        let res = await this.getByAxios(`${this._apiBase}characters?limit=${limit}&offset=${this.offset}&${this._apiKey}`)
        this.offset += limit;
        return res.data.results.map(this._transformCharacter);
    }
    getCharacterByID = async (id) => {
        const res = await this.getByAxios(`${this._apiBase}characters/${id}?&${this._apiKey}`)
        return this._transformCharacter(res.data.results[0])
    }
    getCharacterComics = (id) => {
        
    }


    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description || `Mystical char: ${char.name}, information is classified...`,
            thumbnail: Object.values(char.thumbnail).join("."),
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;
