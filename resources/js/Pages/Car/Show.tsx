    import * as React from 'react';
    import Table from '@mui/material/Table';
    import TableBody from '@mui/material/TableBody';
    import TableCell from '@mui/material/TableCell';
    import TableContainer from '@mui/material/TableContainer';
    import TableHead from '@mui/material/TableHead';
    import TableRow from '@mui/material/TableRow';
    import Paper from '@mui/material/Paper';
import { BackButton } from '@/Components/BackButton';
import { Button, Link } from '@mui/material';
import { Inertia } from '@inertiajs/inertia';


    type Props = {
        car : {
            id: number,
            car_model: string,
            vehicle_model: string,
            grade: string,
            model_year: string,
            color: string,
        }
    }


    export default function carShow({ car }:Props) {
        const handleDelete = () => {
            if(window.confirm('本当に削除しますか？')){
                Inertia.delete(`/car-maintenance/public/car/destroy/${car.id}`);
            }
        }
    return (
    <TableContainer component={Paper} sx={{p:4,m:4}}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell>車種</TableCell>
            <TableCell align="center">{car.car_model}</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
                型式
                </TableCell>
                <TableCell align="center">{car.vehicle_model}</TableCell>
            </TableRow>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
                グレード
                </TableCell>
                <TableCell align="center">{car.grade}</TableCell>
            </TableRow>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
                年式
                </TableCell>
                <TableCell align="center">{car.model_year}</TableCell>
            </TableRow>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
                カラー
                </TableCell>
                <TableCell align="center">{car.color}</TableCell>
            </TableRow>
            
        </TableBody>
        </Table>
        <BackButton />
        <Button color="secondary" variant='outlined'>
            <Link href={`/car-maintenance/public/car/edit/${car.id}`}>
                更新する
            </Link>
        </Button>
        <Button color="error" variant="contained" onClick={handleDelete}>削除</Button>
    </TableContainer>
    );
    }
