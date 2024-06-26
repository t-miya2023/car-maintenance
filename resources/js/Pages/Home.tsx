import  CarInfo  from "@/Components/CarInfo"
import CarSlider from "@/Components/CarSlider"
import CreateNewCar from "@/Components/car/CreateNewCar"
import { MaintenanceAddBotton } from "@/Components/maintenance/MaintenanceAddButton"
import  MaintenanceList  from "@/Components/MantenanceList"
import { SelectCar } from "@/Components/SelectCar"
import { Box } from "@mui/material"

export const Home = () => {
    return (
        <Box>
            <Box>
                <CreateNewCar />
                <SelectCar />
            </Box>
            {/* 上 */}
            <Box sx={{
                display:"flex", 
                flexDirection:["column",null,"row","row"],
                }} 
                justifyContent={"space-between"} 
                mb={5} >
                <CarSlider />
                <CarInfo />
            </Box>
            {/* 下 */}
            <Box>
                <MaintenanceAddBotton />
                <MaintenanceList />
            </Box>
        </Box>
    )
}