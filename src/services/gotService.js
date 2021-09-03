

export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource (url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();

    };
    async getAllCharacters() {
         const res = await this.getResource("/characters?page=5&pageSize=10");
        return res.map(this._transformCharacter);
    }

    async getCharacters(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    async getAllBooks(){
        const books =  this.getResource('/books');
        return this._transformBook(books);
    }

    async getBook(id) {
        const book = this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }

    async getAllHouses() {
        const houses =  this.getResource('/houses');
        return this._transformHouse(houses);
    }
    async getHouse(id) {
        const house =  this.getResource(`/houses/${id}`);
        return this._transformHouse(house);

    }

    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born:char.born,
            died: char.died,
            culture: char.culture
        }
    }

    _transformHouse(house) {
        return{
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons

        }
    }

    _transformBook(book) {
        return{
            name: book.name,
            numberofPages: book.numberofPages,
            publiser: book.publiser,
            released: book.released
        }
    }
}

