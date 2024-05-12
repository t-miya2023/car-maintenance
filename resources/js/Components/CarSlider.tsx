import './App.css';
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from '@mui/material/Grid';
import Carousel from 'react-material-ui-carousel';
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';//左矢印アイコン
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';//右矢印アイコン
import job_architect from './job_architect.jpeg';//建築士画像(カルーセルに貼る画像用)
import job_farmer from './job_farmer.jpeg';//農家画像(カルーセルに貼る画像用)
import job_sales from './job_sales.jpeg';//セールス画像(カルーセルに貼る画像用)

const lColor = 'black';
const bgColor = 'whitesmoke';
const ArrowColor = 'blue';
const ArrowColor_bg = 'white';
const Icon = 'lightskyblue';
const ActiveIcon = 'midnightblue';


export default function Carousel_example(){
  return(
     <Box sx={{pt:8}}>
       <Carousel

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
          <Box sx={{mx: 'auto', height: 268, width: 800,backgroundColor:bgColor}}>
          <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
           <Box sx={{height: 268,width: 400,backgroundColor:lColor}}>
           <Box //画像をCaousel内に貼り付けたい場合
            sx={{
              height: "auto",
              width: 400
            }}
            component="img"
            src={job_architect}
            alt="木造建築士"
           ></Box>
           </Box>
           <Box>
           <Typography sx={{ml:12,mt:3}}variant="h5">木造建築士募集中！</Typography>
            <ul>
            <li>2級建築士もしくは1級建築士の資格をお持ちの方</li>
            <li>戸建て住宅の設計経験を十分に有する方</li>
            <li>チームワークを大切に出来る協調性をお持ちの方</li>
            <li>普通自動車免許取得必須</li>
            </ul>
           <Link>
           <Typography sx={{ml:12,mt:3}} variant="h5">
           詳しくはこちらから
           </Typography>
           </Link>
           </Box>
           </Grid>
          </Box>

      //以下省略

      </Carousel>
    </Box>
  )
}
