import { CarContext } from "@/Providers/CarProvider";
import { Cars } from "@/types/cars";
import { Inertia } from "@inertiajs/inertia"
import { usePage } from "@inertiajs/react";
import { Box, Button, Input, MenuItem, TextField } from "@mui/material"
import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form"

type ItemName = "maintenance_details" | "date" | "next_time" | "amount" | "total_mileage" | "inspection_type" | "shop"| "remarks";

type ItemType = {
    name: ItemName;
    label: string;
    type: string;
    inputmode: "text" | "decimal" | "numeric" | "search" | "none" | "email" | "tel" | "url" | undefined;
}
const items:ItemType[] = [
    { name: "maintenance_details", label: "点検内容", type: "text", inputmode: "text" },
    { name: "date", label: "点検日時", type: "date", inputmode: "text" },
    { name: "next_time", label: "次回点検日時", type: "date" , inputmode: "text"},
    { name: "amount", label: "費用", type: "text" , inputmode: "decimal"},
    { name: "total_mileage", label: "走行距離", type: "text" , inputmode: "numeric"},
    { name: "inspection_type", label: "点検種別", type: "text" , inputmode: "text"},
    { name: "shop", label: "点検店舗", type: "text" , inputmode: "text"},
    { name: "remarks", label: "備考欄", type: "text" , inputmode: "text"}
];

// 入力値の型
type Input = {
    car_id: number;
    maintenance_details: string;
    date: string ;
    next_time: string | null ;
    amount: string ;
    total_mileage: string ;
    inspection_type: string ;
    shop: string | null ;
    remarks: string | null ;
}

// ヴァリデーションの型
type Validation = {
    maintenance_details:{
        required: string,
        maxLength:  { value: number, message: string }
    },
    date:{
        required: string
    },
    amount:{
        required: string
    },
    total_mileage:{
        required: string
    }
}
// InspectionTypの選択肢
const InspectionType = [
    '走行装置',
    '舵取り装置',
    '制動装置',
    '動力伝達装置',
    '電気装置',
    '原動機',
    '排気系',
];

interface PageProps {
    cars: Cars[];
    [key: string]: any;  // インデックスシグネチャを追加
}

export const MaitenanceAddForm = () => {

    // Inertiaからデータを取得
    const { cars } =usePage<PageProps>().props;
    // グローバルステートから取得
    const { selectCar } = useContext(CarContext);
    //selectCarから選択中の車のIDを取得
    const currentCarId = cars.find(car => car.id === selectCar)?.id as number; 
    
    const { control, handleSubmit  } = useForm({
        defaultValues:{
            car_id: currentCarId,
            maintenance_details: '',
            date: '',
            next_time: '',
            amount: '',
            total_mileage: '',
            inspection_type:'走行装置',
            shop: '',
            remarks:'',
        }
    })
    // ヴァリデーションルール
    const validationRules: Validation = {
        maintenance_details:{
            required: '点検内容を入力してください。',
            maxLength:  { value: 100, message: '100文字以内で入力してください。' }
        },
        date:{
            required: '点検日を入力してください。'
        },
        amount:{
            required: '費用を入力してください。'
        },
        total_mileage:{
            required: '総走行距離を入力してください。'
        }
    }

    const onSubmit:SubmitHandler<Input> = (data) => {
        Inertia.post('/maintenance/store',data,{
            preserveScroll: true,
        });
    }


    return (
        <Box component={"form"} 
            onSubmit={handleSubmit(onSubmit)} 
            encType='multipart/form-data'
            sx={{ display: 'flex', 
                flexDirection: 'column' ,
                justifyContent: 'center', 
                maxWidth: '800px',
                margin:'auto'
                }}>
            {items.map(item => (
                <Controller 
                    key={item.name}
                    name={item.name}
                    control={control}
                    rules={validationRules[item.name as keyof Validation]}
                    render={({ field, fieldState}) => (
                        item.name == 'inspection_type' ? (
                            <TextField
                                {...field}
                                label={item.label}
                                type={item.type}
                                inputMode={item.inputmode}
                                fullWidth
                                sx={{ marginBottom: 4 ,width: "100%"}}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                select
                            >
                                {InspectionType.map(type => (
                                    <MenuItem value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                                
                            </TextField>
                        ) : (
                            <TextField
                            {...field}
                            label={item.label}
                            type={item.type}
                            inputMode={item.inputmode}
                            error={fieldState.invalid}
                            helperText={fieldState.error?.message}
                            fullWidth
                            sx={{ marginBottom: 4 ,width: "100%"}}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        )
                    )}
                />
            ))}
            <Controller 
                name="car_id"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        type="hidden"
                        value={currentCarId}
                    />
                    )}
                />

            
            <Button sx={{width:'300px',margin:'auto'}}type="submit" variant="contained" color="primary">登録</Button>
        </Box>
    )
}