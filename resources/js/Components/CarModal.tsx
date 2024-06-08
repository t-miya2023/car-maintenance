import Box from "@mui/material/Box";
import Carousel from 'react-material-ui-carousel';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';//左矢印アイコン
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';//右矢印アイコン
import { usePage } from "@inertiajs/react";
import { useContext } from "react";
import { CarContext } from "@/Providers/CarProvider";
import { Cars } from "@/types/cars";
import { Photos } from "@/types/photos";
import { Button, Modal, Typography } from "@mui/material";
import { DeletePhotoButton } from "./photo/DeletePhotoButton";


const bgColor = 'whitesmoke';
const ArrowColor = 'blue';
const ArrowColor_bg = 'white';
const Icon = 'lightskyblue';
const ActiveIcon = 'midnightblue';

interface PageProps {
    cars: Cars[];
    photos: Photos[];
    [key: string]: any;  // インデックスシグネチャを追加
}

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    currentPhotoId: number;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    p: 4,
};
export default function CarModal(props:Props){
    const { isOpen, setIsOpen, currentPhotoId } = props;
    // Inertiaからデータを取得
    const { photos } =usePage<PageProps>().props;
    // グローバルステートから取得
    const { selectCar } = useContext(CarContext);
    // 対象車の画像を配列で取得
    const currentCarPhotos = photos.filter(photo => photo.car_id === selectCar);
    // 選択した画像のインデックスを取得
    const initialIndex =  currentCarPhotos.findIndex(photo => photo.id === currentPhotoId);

    // モーダルを閉じる関数
    const handleClose = () => setIsOpen(false);

        return(
            <Modal 
                open={isOpen}
                onClose={handleClose}
                >
                    <Box style={style}>
            <Carousel
                index={initialIndex >= 0 ? initialIndex : 0}
                NextIcon={<ArrowForwardIosSharpIcon/>} //矢印アイコンを別のアイコンに変更
                PrevIcon={<ArrowBackIosSharpIcon/>} //矢印アイコンを別のアイコンに変更
                autoPlay = {false} //自動でCarouselを動かすかどうか(true or false)
                //stopAutoPlayOnHover = {true} Carouselの上にマウスを置いている間、自動スクロールを継続するかどうか
                //interval = {4000} 自動でCarouselを動かす時間の間隔(ミリ秒単位)
                //animation = {fade} (fade or slide) Carouselのアニメーションの種類を変更
                //duration = {500} アニメーションの長さを定義
                //swipe = {true} スワイプで動かせるかどうか
                //indicators = {true} インジケーター(下の丸いアイコン)が必要かどうか
                navButtonsAlwaysVisible = {true} //常に矢印アイコンを表示するかどうか
                //navButtonsAlwaysInvisible = {true} //常に矢印アイコンを非表示にするかどうか
                //cycleNavigation = {true} //最後のスライドから「次へ」の矢印アイコンを押した時に最初にスライドに動かせるようにするかどうか
                //fullHeightHover = {true} //次/前のボタンがItem要素の高さ全体をカバーし、ホバー時にボタンを表示するかどうか
                indicatorContainerProps={{
                style: {
                    margin: "3px 0px 0px 0px"
                }
                }}
                indicatorIconButtonProps={{//アクティブでない下の丸いアイコンの設定
                style: {
                    padding: '10px',//位置調整
                    color: Icon,
                }
                }}
                activeIndicatorIconButtonProps={{//アクティブな下の丸いアイコンの設定
                style: {
                    color : ActiveIcon, 
                }
                }}
                navButtonsWrapperProps={{//矢印ボタン周りの設定
                style: {
                    margin: '-20px 15% 0px', //位置調整
                },
                }}
                navButtonsProps = {{//矢印ボタンの設定
                style : { 
                    color : ArrowColor, //矢印の色
                    backgroundColor : ArrowColor_bg,//矢印の背景の色
                    borderRadius : 0,//0にすると四角になる．
                },
            }}>

                {currentCarPhotos.map((img,index) => (
                    <Box key={index}  sx={{mx: 'auto', height: '90vh', width: '100%',backgroundColor:bgColor,overflow:'hidden',cursor:'pointer', objectFit:'contain'}} display={"flex"} alignItems={"center"} justifyContent={"flex-end"} flexDirection={"column"}>
                        <Box 
                            sx={{
                            height: "auto",
                            width: "100%", 
                            mx: 'auto'
                            }}
                            component="img"
                            src={`storage/car_img/${img.path}`}
                            alt={`車 ${index + 1}`}
                        ></Box>
                        <Typography>{img.comment}</Typography>
                        <Button onClick={handleClose}>閉じる</Button>
                        <DeletePhotoButton photoId={img.id}/>
                    </Box>
                ))}
            </Carousel>
            </Box>
        </Modal>
        )
    }

