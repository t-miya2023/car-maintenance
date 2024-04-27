    import * as React from 'react';
    import Table from '@mui/material/Table';
    import TableBody from '@mui/material/TableBody';
    import TableCell from '@mui/material/TableCell';
    import TableContainer from '@mui/material/TableContainer';
    import TableHead from '@mui/material/TableHead';
    import TableRow from '@mui/material/TableRow';
    import Paper from '@mui/material/Paper';

    type Props = {
        car : {
            car_model: string,
            vehicle_model: string,
            grade: string,
            model_year: string,
            color: string,
        }
    }


    export default function carShow({ car }:Props) {
    return (
    <TableContainer component={Paper} sx={{p:4,m:4}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
    </TableContainer>
    );
    }
