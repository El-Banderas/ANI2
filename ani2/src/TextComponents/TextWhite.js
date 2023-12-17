
import React, { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import './Text.scss'

// FONT weight https://mui.com/system/typography/
export default function TextWhite({ text, size, fontWeightGiven }) {

   return (
      <div className="white">
      <Typography sx={{ color: "#FFFFFF", fontSize: size , fontWeight: fontWeightGiven }} color="text.primary" component="div" >
              {text}
            </Typography>
</div>
       )
}