const fs = require('fs');
const path = require('path');
const util = require('util');
const uuid = require('uuid/v4');

class DB {
    // _nextId = 3;
    _dir = 'data';
    _file = 'data.json';

    constructor() {
        const pathRoute = path.join(this._dir);
        if (!fs.existsSync(pathRoute)) {
            fs.mkdirSync(pathRoute);
        }

        const fileRoute = path.join(pathRoute, this._file);
        if (!fs.existsSync(fileRoute)) {
            const seedData = [
                {
                    id: uuid(),
                    price: 100,
                    name: 'Cola',
                },
                {
                    id: uuid(),
                    price: 300,
                    name: 'Coca',
                },
            ];

            fs.writeFileSync(fileRoute, JSON.stringify(seedData, null, 2));
        }
    }

    async createItem({price, name}) {
        // const id = this._nextId++;
        const id = uuid();
        const items = await this._readItemsfromData();
        const newItem = {
            id,
            price,
            name,
        };

        items.push(newItem);
        await this._writeItemsIntoData(items);

        return newItem;
    }

    async getItem(id) {
        if (!id) return null;

        const items = await this._readItemsfromData();

        return items.find(item => item.id === id);
    }

    async getItems() {
        return await this._readItemsfromData();
    }

    async deleteItem(id) {
        let items = await this._readItemsfromData();

        items = items.filter(item => item.id !== id);
        await this._writeItemsIntoData(items);
    }

    async updateItem(id, {price, name}) {
        if (!id || !price || !name) return null;

        let updatedItem = null;
        let items = await this._readItemsfromData();

        items = items.map(item => {
            if (item.id === id) {
                updatedItem = {
                    id,
                    price,
                    name,
                };

                return updatedItem;
            }

            return item;
        });
        await this._writeItemsIntoData(items);

        return updatedItem;
    }

    async _readItemsfromData() {
        let items;
        const readFilePromise = util.promisify(fs.readFile);

        items = await readFilePromise(path.join(this._dir, this._file))
            .then(result => JSON.parse(result.toString()))
            .catch(error => console.error(error));

        return items;
    }

    async _writeItemsIntoData(items) {
        const writeToFilePromise = util.promisify(fs.writeFile);

        await writeToFilePromise(
            path.join(this._dir, this._file),
            JSON.stringify(items, null, 2)
        ).catch(error => console.error(error));
    }
}

module.exports = DB;
