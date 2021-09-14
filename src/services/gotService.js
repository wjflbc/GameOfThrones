

export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

     getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();

    };
     getAllCharacters = async () => {
         const res = await this.getResource("/characters?page=5&pageSize=10");
        return res.map(this._transformCharacter);
    }

     getCharacters = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

     getAllBooks = async () => {
        const books = await this.getResource('/books');
        return books.map(this._transformBook);
    }

     getBook = async (id) =>  {
        const book = this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

     getAllHouses = async () => {
        const houses = await this.getResource('/houses');
         return houses.map(this._transformHouse);
    }

     getHouse = async (id) => {
        const house =  this.getResource(`/houses/${id}`);
        return this._transformHouse(house);

    }

    isSet(data) {
        if (data) {
            return data
        } else {
            return 'no data :('
        }
    }


    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        let id = null;

        if (item.url !== undefined) {
            id =  item.url.match(idRegExp)[1];
        }

        return id;
    }




    _transformCharacter = (char) => {
        // console.log(char);
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    }



    _transformHouse = (house) => {
        return{
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            overlord: this.isSet(house.overlord),
            ancestralWeapons: this.isSet(house.ancestralWeapons)

        }
    }

    _transformBook = (book) => {
        return{
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberofPages),
            publisher: this.isSet(book.publiser),
            released: this.isSet(book.released)
        }
    }
}

