import { useContext } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { usePage } from '@inertiajs/react';
import { Cars } from '@/types/cars';
import { CarContext } from '@/Providers/CarProvider';
import { Maintenaces } from "@/types/maintenaces";
import { MaintenanceEditBotton } from "./MaintenanceEditButton";
import { MaintenanceDeleteButton } from "./MaintenanceDeleteButton";


interface PageProps {
  cars: Cars[];
  maintenances: Maintenaces[];
  [key: string]: any;  // インデックスシグネチャを追加
}

const columns: GridColDef[] = [
  { field: 'maintenance_details', headerName: '点検内容', width: 300 },
  { field: 'date', headerName: '点検日時', width: 130 },
  { field: 'next_time', headerName: '次回点検日時', width: 130 },
  { field: 'amount', headerName: '費用', width: 80 },
  { field: 'total_mileage', headerName: '走行距離', width: 80 },
  { field: 'inspection_type', headerName: '点検タイプ', width: 130 },
  { field: 'shop', headerName: '店舗', width: 130 },
  { field: 'remarks', headerName: '備考', width: 130 },
  { field: 'edit', headerName: '編集', width: 80, 
    renderCell: (params) => (
      <MaintenanceEditBotton maintenanceId={params.id as number} />
    ), 
  },
  { field: 'delete', headerName: '削除', width: 80,
    renderCell: (params) => (
      <MaintenanceDeleteButton maintenanceId={params.id as number} />
    ), 
  },
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
          amount: data.amount ,
          total_mileage: data.total_mileage,
          inspection_type:data.inspection_type,
          shop: data.shop,
          remarks: data.remarks,
          }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        localeText={{
          noRowsLabel: 'データがありません', // データがない場合のメッセージを設定
        }}
      />
    </div>
  );
}