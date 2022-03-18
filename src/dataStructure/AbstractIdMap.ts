
export default interface AbstractIdMap<T> {
    new() : any;
    addData(data: T): string;
}