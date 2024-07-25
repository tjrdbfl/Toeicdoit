"use client";
import { Box, FormControlLabel } from "@mui/material";
import Link from "next/link";
import { ChangeEvent, ChangeEventHandler, Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import {Checkbox} from "@mui/material";
import { check } from "@/constants/register/checkbox";
import RegCheckModalBtn from "./RegCheckModalBtn";


const RegCheckChild=(
    {id,label,option,checked,checkedP,handleChildMiddle,handleChildLast}:{id:number
    ,label:string
    ,option:boolean
    ,checked:boolean
    ,checkedP:boolean
    ,handleChildMiddle?: (event: ChangeEvent<HTMLInputElement>) => void
    ,handleChildLast?: (event: ChangeEvent<HTMLInputElement>) => void}
   
)=>{

    return(
    <FormControlLabel
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: 0,
        }}
        labelPlacement='start'
        label={
            id === 1 ?
                <div className='flex flex-row w-[150%]'>
                    <div className="text-[14px] text-slate-500 font-medium">
                        {label}
                    </div>
                    <div className='text-slate-300 ml-[2%] mt-[0.5%] font-semibold text-[14px]'>
                        {option ? '(필수)' : '(선택)'}
                    </div>
                </div>
                :
                <div className='flex flex-row w-[150%] '>
              
              <RegCheckModalBtn id={id} label={label}/>
                   
                    <div className='text-slate-300 ml-[2%] mt-[0.65%] font-semibold text-[14px]'>
                        {option ? '(필수)' : '(선택)'}
                    </div>
                </div>
        }
        control={
            id !== check.length ?
                <Checkbox
                    checked={checked||checkedP}
                    onChange={handleChildMiddle}
                    inputProps={{ 'aria-label': 'controlled' }}
                    sx={{
                        color: '#e2e8f0',
                        '&.Mui-checked': {
                            color: '#5AB2FF',
                        },
                    }}
                    size='medium'
                />
                :
                <Checkbox
                    className=''
                    checked={checked||checkedP}
                    onChange={handleChildLast}
                    inputProps={{ 'aria-label': 'controlled' }}
                    sx={{
                        color: '#e2e8f0',
                        '&.Mui-checked': {
                            color: '#5AB2FF',
                        },
                    }}
                    size='large'
                />
        }
    />
);
}
export default RegCheckChild;