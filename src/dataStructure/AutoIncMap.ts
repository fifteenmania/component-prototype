import type DataSpec from './DataSpec'

export default class AutoIncMap<T>{
    // string Id specified map
    dataMap: Map<string, T>
    maxKey: number
    constructor() {
        this.dataMap = new Map();
        this.maxKey = 0;
    }

    generateKey(): string {
        this.maxKey += 1;
        return this.maxKey.toString();
    }

    addData(data: T): string {
        const key = this.generateKey();
        this.dataMap.set(key, data);
        return key;
    }

    getData(key: string): T|undefined {
        return this.dataMap.get(key)
    }

    getAllData(): DataSpec<T>[] {
        const result: DataSpec<T>[] = []
        this.dataMap.forEach((value, key) => {
            const data: DataSpec<T> = {
                id: key,
                data: value
            }
            result.push(data)
        })
        return result
    }
}