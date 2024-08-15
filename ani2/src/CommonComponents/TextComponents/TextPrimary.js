
import React from "react";
import Typography from '@mui/material/Typography';

// FONT weight https://mui.com/system/typography/
export default function TextComponentPrimary({ text, size, fontWeightGiven }) {

   return (
      <Typography sx={{ fontSize: size , fontWeight: fontWeightGiven }} color="text.primary" component="div" >
              {text}
            </Typography>
       )
}