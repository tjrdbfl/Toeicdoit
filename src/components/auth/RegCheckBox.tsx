"use client";
import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { Box } from '@mui/material';
import RegCheckChild from './RegCheckChild';
import RegCheckParent from './RegCheckParent';
import { check } from '@/constants/register/checkbox';

const RegCheckBox = () => {

    const checkedValues = check.reduce((acc: { [key: number]: boolean }, item) => {
        acc[item.id] = item.check;
        return acc;
    }, {});

    const checkedOptions: number[] = check.filter((item) => item.option).map((item) => item.id);

    const [checked, setChecked] = useState(() => checkedValues);
    
    const error = checked[0] || (Object.values(checkedOptions).filter((i) => i != 0).map((i) => checked[i]).filter((v) => v).length === (checkedOptions.length - 1)) ?
        "" : "이용약관에 동의해주세요";
    
    const totalCheck:boolean=Object.values(check).filter((item) => item.id!==0).map((i) => i.id)
    .map((id:number)=>checked[id]).filter((v) => v).length === (check.length-1) 
    ? true : false;

    const children = (
        <div className='w-full mt-[3%]'>
            {check.map((element: { id: number; label: string; option: boolean; }) => (
                element.id !== 0 && (
                    <Box key={element.id} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <RegCheckChild // Call the function here
                        id={element.id}
                        label={element.label}
                        option={element.option}
                        checked={checked[element.id]}
                        checkedP={checked[0]}
                        handleChildMiddle={
                            (event: ChangeEvent<HTMLInputElement>) => {
                                setChecked({ ...checked, [element.id]: event.target.checked });
                                console.log(JSON.stringify(checked));

                            }} // Pass the function itself
                        handleChildLast={
                            (event: ChangeEvent<HTMLInputElement>) => {
                                setChecked({ ...checked, [element.id]: event.target.checked });
                                console.log(JSON.stringify(checked));
                            }
                        } // Pass the function itself
                    />
                    </Box>
                )
            ))}
        </div>
        
    );

    return (
        <div className='w-full my-[10%]'>
            <RegCheckParent
            label={check[0].label}
            checkedP={checked[0]}
            checkedC={checked[1]} 
            checkTotal={totalCheck}
            handleParent={
                (event: ChangeEvent<HTMLInputElement>) => {
                    setChecked({ ...checked, [0]: event.target.checked });
                    console.log(JSON.stringify(checked));
                }
            } 
            />
            <div className='h-[1px] bg-slate-300 mt-[2%]'/>
            {children}
            <div className='text-red-600 text-[14px] mt-[2%]'
            >{error}</div>
        </div>
    );
}
export default RegCheckBox;

