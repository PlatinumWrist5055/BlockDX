const fs = require('fs-extra-promise');
const cloneDeep = require('lodash/cloneDeep');
const omit = require('lodash/omit');
const { logger } = require('./logger');

class SimpleStorage {
    private _dataFilePath: string
    private _data: any

    constructor(dataFilePath: string) {
        this._dataFilePath = dataFilePath;
        fs.ensureFileSync(dataFilePath);
        let data;
        try {
            data = fs.readJsonSync(dataFilePath);
        } catch (err) {
            data = {};
            fs.writeJsonSync(dataFilePath, data);
        }
        this._data = data;
    }

    async saveData() {
        try {
            await fs.writeJsonAsync(this._dataFilePath, this._data);
        } catch (err) {
            logger.error(err.message + '\n' + err.stack);
        }
    }

    saveDataSync() {
        fs.writeJsonSync(this._dataFilePath, this._data);
    }

    getItem(key: string) {
        const item = this._data[key];
        if (!item) return item;
        return cloneDeep(item);
    }

    setItem(key: string, val: string, saveSync:boolean) {
        if (!val) {
            this._data[key] = val;
        } else {
            this._data[key] = cloneDeep(val);
        }

        if (saveSync) {
            this.saveDataSync();
        } else {
            this.saveData();
        }

        return val;
    }

    setItems(obj: any, saveSync: boolean) {
        for (const key of Object.keys(obj)) {
            const val = obj[key];
            if (!val) {
                this._data[key] = val;
            } else {
                this._data[key] = cloneDeep(val);
            }
        }

        if (saveSync) {
            this.saveDataSync();
        } else {
            this.saveData();
        }

        return obj;
    }

    removeItem(key: string, saveSync = false) {
        const newData = omit(this._data, [key]);
        this._data = newData;
        if (saveSync) {
            this.saveDataSync();
        } else {
            this.saveData();
        }
        return;
    }

    removeItems(keys: string[], saveSync = false) {
        const newData = omit(this._data, keys);
        this._data = newData;
        if (saveSync) {
            this.saveDataSync();
        } else {
            this.saveData();
        }

        return;
    }

    clear() {
        this._data = {};
        this.saveData();
        return;
    }
}

export default SimpleStorage;

