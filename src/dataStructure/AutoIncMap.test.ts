import AutoIncMap from "./AutoIncMap";

interface Dummy {
    a: string,
    b: string
}

function makeDummy(): Dummy {
    return {
        a: Math.random().toString(),
        b: Math.random().toString()
    }
}

const testMap = new AutoIncMap<Dummy>()
