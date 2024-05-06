import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Cars } from '@/types/cars';
import { usePage } from '@inertiajs/react';
import { CarContext } from '@/Providers/CarProvider';
import { useContext, useEffect, useState } from "react";


interface PageProps {
    cars: Cars[];
    [key: string]: any;  // インデックスシグネチャを追加
}


export default function CarInfo() {
    // Inertiaからデータを取得
    const { cars } =usePage<PageProps>().props;
    // グローバルステートから取得
    const { selectCar } = useContext(CarContext);
    //IDから対象の車種情報を取得
    const currentCar = cars.find(car => car.id === selectCar); 

    return (
        <TableContainer component={Paper}>
            {currentCar ? (
                <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>車種名</TableCell>
                    <TableCell>{currentCar?.car_model}</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            型式
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {currentCar?.vehicle_model}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            グレード
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {currentCar?.grade}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            年式
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {currentCar?.model_year}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            カラー
                        </TableCell>
                        <TableCell component="td" scope="row">
                            {currentCar?.color}
                        </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            ):(
            <Table sx={{ minWidth: 300 }} size="small">
                <TableBody>
                    <TableRow sx={{height:"200px"}}>
                        <TableCell style={{ textAlign: 'center', padding: '16px', fontSize:"1.5rem", verticalAlign: 'middle' }}>
                            空
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )}
        </TableContainer>
    );
    }
