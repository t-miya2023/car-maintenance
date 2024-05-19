export type Maintenaces = {
    id: number;
    car_id: number;
    maintenance_details: string;
    date: string ;
    next_time: string | null ;
    amount: string ;
    total_mileage: string ;
    inspection_type: string ;
    shop: string | null ;
    remarks: string | null ;
}