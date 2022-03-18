import AutoIncMap from "./AutoIncMap";

export default class NamespacedMap<T> {
    dataMap: Map<string, AutoIncMap<T>>
    constructor() {
        this.dataMap = new Map()
    }

    getData(namespace: string) {
        let datas = this.dataMap.get(namespace)
        if (datas === undefined) {
            datas = new AutoIncMap()
            this.dataMap.set(namespace, datas);
        }
        return datas
    }

    listNamespace(): string[] {
        const result: string[] = []
        for (const key of this.dataMap.keys()) {
            result.push(key)
        }
        return result
    }
}