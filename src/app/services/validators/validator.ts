import { TableColumn } from "../models/table-column";

export interface Validator<T> {

    isValid(data: any[], columns: TableColumn[]): boolean;

}