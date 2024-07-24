"use client";
import { Box, FormControlLabel, Checkbox, Typography } from "@mui/material";
import Link from "next/link";
import { ChangeEvent, ChangeEventHandler } from "react";

const RegCheckParent = (
    { label, checkedP, checkedC,checkTotal, handleParent }: {
      label: string;
      checkedP: boolean;
      checkedC: boolean;
      checkTotal:boolean;
      handleParent?: (event: ChangeEvent<HTMLInputElement>) => void;
    }
  ) => {
   
    return (
            <FormControlLabel
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginLeft: 0,
                }}
                labelPlacement='start'
                label={
                    <Typography className="text-black" fontSize={15} fontWeight={600}>
                        {label}
                    </Typography>
                }
                control={
                    <Checkbox
                        checked={checkedP || checkTotal}
                        onChange={handleParent}
                        inputProps={{ 'aria-label': 'controlled' }}
                        sx={{
                            color: '#e2e8f0',
                            '&.Mui-checked': {
                                color: '#5AB2FF',
                            },
                        }}
                        size='medium'
                    />
                }
            />
    );
}
export default RegCheckParent;