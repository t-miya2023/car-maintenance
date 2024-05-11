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


export default function MaintenanceList() {

      // Inertiaからデータを取得
      const { cars, maintenances } =usePage<PageProps>().props;
      // グローバルステートから取得
      const { selectCar } = useContext(CarContext);
      //selectCarから選択中の車のIDを取得
      const currentCarId = cars.find(car => car.id === selectCar)?.id; 
      // 選択中の車のメンテナンス情報を絞りこみ　空の可能性もあるためから配列を置く
      const maintenanceArray = (maintenances || []).filter(maintenance => maintenance.car_id === currentCarId)
      // console.log(maintenanceArray);
      
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={maintenanceArray.map(data => ({
          id: data.id,
          maintenance_details: data.maintenance_details,
          date: data.date,
          next_time: data.next_time,
          }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        localeText={{
          noRowsLabel: 'データがありません', // データがない場合のメッセージを設定
        }}
      />
    </div>
  );
}