export type Maintenaces = {
    id: number;
    car_id: number;
    maintenance_details: string;
    date: string ;
    next_time: string | null ;
    amount: string ;
    total_mileage: string ;
    inspection_type: InspectionType ;
    shop: string | null ;
    remarks: string | null ;
}

export type InspectionType = '走行装置' | '舵取り装置' | '制動装置' | '動力伝達装置' | '電気装置' | '原動機' | '排気系';