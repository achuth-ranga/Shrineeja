import { TripColumnType } from 'src/app/services/enums/trip-column-type';
import { TableColumn } from './table-column';


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
        key: 'startDate',
        type: TripColumnType.DATE,
        label: 'Start Date',
        required: true,
    },
    {
        key: 'endDate',
        type: TripColumnType.DATE,
        label: 'End Date',
        required: true,
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
        key: 'startKiloMeters',
        type: TripColumnType.NUMBER,
        label: 'Start KMS',
        required: true,
    },
    {
        key: 'endKiloMeters',
        type: TripColumnType.NUMBER,
        label: 'End KMS',
        required: true,
    },
    {
        key: 'totalKiloMeters',
        type: TripColumnType.NUMBER,
        label: 'Total KMS',
        required: true,
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
    },
    // {
    //     key: 'dieselLiters',
    //     type: TripColumnType.NUMBER,
    //     label: 'Diesel Liters',
    //     required: true,
    // },
    // {
    //     key: 'dieselAmount',
    //     type: TripColumnType.NUMBER,
    //     label: 'Diesel Amount',
    //     required: true,
    // },
    // {
    //     key: 'endReading',
    //     type: TripColumnType.NUMBER,
    //     label: 'End Reading',
    //     required: true,
    // },
    {
        key: 'edit',
        type: 'edit',
        label: '',
        required: false
    },
]

