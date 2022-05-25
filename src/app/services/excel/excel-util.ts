import * as XLSX from 'xlsx';
import { TableColumn } from 'src/app/services/models/table-column';


export class ExcelUtil {


    static createExcel(displayColumns: string[], columnsSchema: TableColumn[], data: any, fileName: string, sheetName: string) {
        let organised: any[] = [];
        data.forEach((obj: any) => {
            let newObj: any = {};
            displayColumns.forEach((k) => newObj[k] = obj[k])
            organised.push(newObj);
        })
        let Heading = [columnsSchema.map((col) => col.label)];
        //Had to create a new workbook and then add the header
        const wb = XLSX.utils.book_new();
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.sheet_add_aoa(ws, Heading);

        //Starting in the second row to avoid overriding and skipping headers
        XLSX.utils.sheet_add_json(ws, organised, { origin: 'A2', skipHeader: true });
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
        XLSX.writeFile(wb, fileName);
    }
}