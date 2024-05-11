import { useContext } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { usePage } from '@inertiajs/react';
import { Cars } from '@/types/cars';
import { CarContext } from '@/Providers/CarProvider';
import { Maintenaces } from "@/types/maintenaces";


interface PageProps {
  cars: Cars[];
  maintenances: Maintenaces[];
  [key: string]: any;  // インデックスシグネチャを追加
}

const columns: GridColDef[] = [
  { field: 'maintenance_details', headerName: '点検内容', width: 300 },
  { field: 'date', headerName: '点検日時', width: 130 },
  { field: 'next_time', headerName: '次回点検日時', width: 130 },
];



const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function MaintenanceList() {

      // Inertiaからデータを取得
      const { cars, maintenances } =usePage<PageProps>().props;
      // グローバルステートから取得
      const { selectCar } = useContext(CarContext);
      //selectCarから選択中の車のIDを取得
      const currentCarId = cars.find(car => car.id === selectCar)?.id; 
      // 選択中の車のメンテナンス情報を絞りこみ　空の可能性もあるためから配列を置く
      const maintenanceArray = (maintenances || []).filter(maintenance => maintenance.car_id === currentCarId)
      console.log(maintenanceArray);
      
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={maintenanceArray.map(data => ({
          id: data.id,
          maintenance_details: data.maintenance_details,
          date: data.date,
          next_time: data.next_time,
        })
        )}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}