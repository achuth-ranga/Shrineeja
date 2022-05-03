import { TripColumnType } from 'src/app/services/enums/trip-column-type';
import { RuleType } from '../rules/rule-type';
import { TableColumn } from './table-column';
import { TripReportColumnsKey } from './table-column';


export const TripReportColumns: TableColumn[] = [
    {
        key: 'regno',
        type: TripColumnType.REGNO_SEARCH,
        label: 'Reg No',
        required: true,
    },
    {
        key: 'vehType',
        type: TripColumnType.VEHICLE_TYPE,
        label: 'Vehicle Type',
        required: true,
    },
    {
        key: 'driverName',
        type: TripColumnType.DRIVER,
        label: 'Driver Name',
        required: true,
    },
    {
        key: TripReportColumnsKey.START_DATE,
        type: TripColumnType.DATE,
        label: 'Start Date',
        required: true,
        pattern: 'yyyy-MM-dd'
    },
    {
        key: TripReportColumnsKey.END_DATE,
        type: TripColumnType.DATE,
        label: 'End Date',
        required: true,
        pattern: 'yyyy-MM-dd'
    },
    {
        key: 'clientName',
        type: TripColumnType.BUSINESS_CLIENT,
        label: 'Client Name',
        required: true,
    },
    {
        key: 'businessType',
        type: TripColumnType.BUSINESS_TYPE,
        label: 'Business Type',
        required: true,
    },
    {
        key: 'tripId',
        type: TripColumnType.NUMBER,
        label: 'Trip ID',
        required: true,
    },
    {
        key: 'guestName',
        type: TripColumnType.TEXT,
        label: 'Guest Name',
        required: true,
    },
    {
        key: 'fromLocation',
        type: TripColumnType.TEXT,
        label: 'From Location',
        required: true,
    },
    {
        key: 'toLocation',
        type: TripColumnType.TEXT,
        label: 'To Location',
        required: true,
    },
    {
        key: TripReportColumnsKey.START_KILOMETERS,
        type: TripColumnType.NUMBER,
        label: 'Start KMS',
        required: true,
    },
    {
        key: TripReportColumnsKey.END_KILOMETERS,
        type: TripColumnType.NUMBER,
        label: 'End KMS',
        required: true,
    },
    {
        key: TripReportColumnsKey.TOTAL_KILOMETERS,
        type: TripColumnType.NUMBER,
        label: 'Total KMS',
        required: true,
        disabled: true,
        rule: {
            type: RuleType.NUMBER,
            columns: [
                { number: TripReportColumnsKey.START_KILOMETERS },
                { number: TripReportColumnsKey.END_KILOMETERS }]
        }
    },
    {
        key: 'startTime',
        type: TripColumnType.TIME,
        label: 'Start Time',
        required: true,
    },
    {
        key: 'endTime',
        type: TripColumnType.TIME,
        label: 'End Time',
        required: true,
    },
    {
        key: 'totalHours',
        type: TripColumnType.NUMBER,
        label: 'Total Hours',
        required: true,
        disabled: true,
        rule: {
            type: RuleType.DATE_TIME_HOURS,
            columns: [
                {
                    date: TripReportColumnsKey.START_DATE,
                    time: TripReportColumnsKey.START_TIME
                },
                {
                    date: TripReportColumnsKey.END_DATE,
                    time: TripReportColumnsKey.END_TIME
                }]
        }
    },
    {
        key: 'edit',
        type: 'edit',
        label: '',
        required: false
    },
]

