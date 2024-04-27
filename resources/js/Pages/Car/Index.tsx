import { Link } from "@inertiajs/react"
import { Button } from "@mui/material"
import SideBar from "@/Layouts/AppLayout"

type Props = {
    cars: {
        id: number,
        car_model:string,
    }[]
}

export default function carIndex({ cars }: Props) {
    return (
        <div>
            {cars.map((car,index) => (
                <div key={index}>
                    {car.car_model} 
                    - <Link href={`/car-maintenance/public/car/show/${car.id}`}>詳細</Link> 
                </div>
            ))}
            <Button variant="contained" color="primary">
                <Link href={`/car-maintenance/public/car/create`}>新規登録</Link>
            </Button>
        </div>
    )
}