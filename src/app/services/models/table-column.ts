export interface TableColumn {
    key: string,
    type: string,
    label: string,
    required: boolean,
    disabled?: any,
    pattern?: any,
    rule?: any
}

export class TripReportColumnsKey{
    
    static START_KILOMETERS: string = "startKiloMeters";
    static END_KILOMETERS: string = "endKiloMeters";
    static TOTAL_KILOMETERS: string = "totalKiloMeters";


    static START_DATE: string = "startDate";
    static END_DATE: string = "endDate";
    static START_TIME: string = "startTime";
    static END_TIME: string = "endTime";
    static TOTAL_HOURS: string = "totalHours";

}