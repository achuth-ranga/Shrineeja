export interface Rule<T> {

    getValue(obj: any, columns: any[]): T;

}
