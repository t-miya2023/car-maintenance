import { Maintenaces } from "@/types/maintenaces";
import { Photos } from "@/types/photos";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/react";
import { Box, Button, Modal, Typography } from "@mui/material"

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
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    photoId: number;
}


interface PageProps {
    photos: Photos[];
    [key: string]: any;  // インデックスシグネチャを追加
}

export const DeletePhotoModal = (props: Props) => {
    const { open, setOpen, photoId } = props;
    // Inertiaからデータを取得
    const { photos } =usePage<PageProps>().props;
    //IDから対象の点検情報を取得
    const currentPhoto = photos.find(photo => photo.id === photoId); 
    // 削除関数
    const handleCarDelete = () => {
        if(currentPhoto){
            Inertia.delete(`/photo/destroy/${currentPhoto.id}`);
        }
    }
    // モーダルを閉じる関数
    const handleClose = () => setOpen(false);

    return (
        <Modal
        open={open}
        onClose={handleClose}>
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                選択した画像を本当に削除しますか？
            </Typography>
            <Typography id="modal-modal-description" sx={{ my: 3 }}>
            一度削除したデータは復元できません。
            </Typography>
            <Box display={"flex"} justifyContent={"space-between"}>
                <Button onClick={handleCarDelete} variant="outlined" color="error">削除</Button>
                <Button onClick={handleClose} variant="outlined" color="secondary">キャンセル</Button>
            </Box>
        </Box>
        </Modal>
    )
}