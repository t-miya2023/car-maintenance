import { Box } from "@mui/material"

export const Home = () => {
    return (
        <Box>
            {/* 上 */}
            <Box>
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