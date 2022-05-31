import * as SecureStore from "expo-secure-store";
import 'react-native-get-random-values'
import {v4 as uuidv4} from 'uuid';

export class Note {
    constructor(title, content) {
        this.title = title
        this.content = content
        this.date = Date.now()
        this.color = Note.randomColor()
        this.key = uuidv4()
    }

    static async deleteAndKey(key) {
        console.log(key)
        await this.deleteItem(key)
        let keysArr = JSON.parse(await this.getItem("keys"));
        keysArr = keysArr.filter((e) => {
            if (e !== key) {
                return e
            }
        })
        await SecureStore.setItemAsync("keys", JSON.stringify(keysArr));
        return
    }

    static async createAndSave(title, content) {
        const note = new Note(title, content)
        await Note.saveItem(note.key, JSON.stringify(note))
        let keysArr = JSON.parse(await Note.getItem("keys"));
        if (keysArr == null || !Array.isArray(keysArr))
            keysArr = []
        keysArr.push(note.key)
        await SecureStore.setItemAsync("keys", JSON.stringify(keysArr));
    }


    static async getAll() {
        const keys = JSON.parse(await this.getItem("keys"))

        if (keys == null)
            return []
        return Promise.all(keys.map(async (key) => {
                return JSON.parse(await this.getItem(key))
        }))
    }

    static randomColor() {
        const tab = ["red", "green", "blue"]
        return tab[Math.round(Math.round(Math.random() * 200) / 100)]
    }

    static async saveItem(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    static async getItem(key) {
        return await SecureStore.getItemAsync(key);
    }

    static async deleteItem(key) {
        await SecureStore.deleteItemAsync(key);
    }


}