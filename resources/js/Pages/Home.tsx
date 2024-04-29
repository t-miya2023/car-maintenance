import { AddCar } from "@/Components/AddCar"
import { CarInfo } from "@/Components/CarInfo"
import { CarSlider } from "@/Components/CarSlider"
import { MaintenanceList } from "@/Components/MantenanceList"
import { Box } from "@mui/material"

export const Home = () => {
    return (
        <Box>
            <Box>
                <AddCar />
            </Box>
            {/* 上 */}
            <Box sx={{display:"flex"}} justifyContent={"space-between"}>
                <CarSlider />
                <CarInfo />
            </Box>
            {/* 下 */}
            <Box>
                <MaintenanceList />
            </Box>
        </Box>
    )
}