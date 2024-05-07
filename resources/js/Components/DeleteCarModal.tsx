import { CarContext } from "@/Providers/CarProvider";
import { Cars } from "@/types/cars";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import { Box, Button, Typography } from "@mui/material"
import { useContext } from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

type Props = {
    handleClose: () => void;
}


interface PageProps {
    cars: Cars[];
    [key: string]: any;  // インデックスシグネチャを追加
}

export const DeleteCarModal = ({handleClose}: Props) => {
    // Inertiaからデータを取得
    const { cars } =usePage<PageProps>().props;
    // グローバルステートから取得
    const { selectCar } = useContext(CarContext);
    //IDから対象の車種情報を取得
    const currentCar = cars.find(car => car.id === selectCar); 
    // 削除関数
    const handleCarDelete = () => {
        if(currentCar){
            Inertia.delete(`/car/destroy/${currentCar.id}`);
        }
    }

    return (
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            本当に削除しますか？
            </Typography>
            <Typography id="modal-modal-description" sx={{ my: 3 }}>
            一度削除したデータは復元できません。
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Button onClick={handleCarDelete} variant="outlined" color="error">削除</Button>
                <Button onClick={handleClose} variant="outlined" color="secondary">キャンセル</Button>
            </Box>
        </Box>
    )
}