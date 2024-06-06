import Box from "@mui/material/Box";
import Carousel from 'react-material-ui-carousel';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';//左矢印アイコン
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';//右矢印アイコン
import { usePage } from "@inertiajs/react";
import React, { useContext } from "react";
import { CarContext } from "@/Providers/CarProvider";
import { Cars } from "@/types/cars";
import { CreatePhotoButton } from "./photo/CreatePhotoButton";
import { Photos } from "@/types/photos";
import { Typography } from "@mui/material";
import CarModal from "./CarModal";


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

export default function CarSlider(){
    // Inertiaからデータを取得
    const { cars, photos } =usePage<PageProps>().props;
    // グローバルステートから取得
    const { selectCar } = useContext(CarContext);
    //IDから対象の車種情報を取得
    const currentCar = cars.find(car => car.id === selectCar); 
    // 対象車の画像を配列で取得
    const currentCarPhotos = photos.filter(photo => photo.car_id === selectCar);
    // モーダルのステート
    const [isOpen, setIsOpen] = React.useState(false);
    // モーダルを開ける関数
    const handleOpen = () => {
        console.log(isOpen);
        setIsOpen(true);
    };


    if(!currentCar){
        return (
            <Box flex={1} mr={2} mb={2}>
                <Box sx={{mx: 'auto', height: 268, width: 400,backgroundColor:bgColor,overflow:'hidden'}} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <Box 
                        sx={{
                        height: "auto",
                        width: { xs: '100%', sm: '80%', md: '60%', lg: '450px' }, 
                        mx: 'auto'
                        }}
                        component="img"
                        src="/images/no_car.png"
                        alt="車"
                    ></Box>
                </Box>
            </Box>
        )
    }else{
        return(
            <Box flex={1} mr={2} mb={2} sx={{width:"100%"}}>
            <Carousel
    
                NextIcon={<ArrowForwardIosSharpIcon/>} //矢印アイコンを別のアイコンに変更
                PrevIcon={<ArrowBackIosSharpIcon/>} //矢印アイコンを別のアイコンに変更
                autoPlay = {true} //自動でCarouselを動かすかどうか(true or false)
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
                {currentCarPhotos.length > 0 ? currentCarPhotos.map((img,index) => (
                    <Box key={index} sx={{mx: 'auto', height: 268, width: 400,backgroundColor:bgColor,overflow:'hidden',cursor:'pointer'}} display={"flex"} alignItems={"center"} justifyContent={"flex-end"} flexDirection={"column"} onClick={handleOpen}>
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
                    </Box>
                )):(
                    <Box sx={{mx: 'auto', height: 268, width: 400,backgroundColor:bgColor,overflow:'hidden'}} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                        <Box 
                            sx={{
                            height: "auto",
                            width: { xs: '100%', sm: '80%', md: '60%', lg: '450px' }, 
                            mx: 'auto'
                            }}
                            component="img"
                            src="/images/no_images.png"
                            alt="車"
                        ></Box>
                    </Box>
                )}
            </Carousel>
            <CarModal isOpen={isOpen} setIsOpen={setIsOpen} />
            <CreatePhotoButton />
        </Box>
        )
    }
}
