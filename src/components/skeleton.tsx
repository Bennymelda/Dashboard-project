// Skeleton.tsx

import React from "react";



type SkeletonProps = {

width?: string;

height?: string | number;

style?: React.CSSProperties;

};



export const Skeleton = ({ width = "100%", height = 20, style = {} }: SkeletonProps) => (

<div

style={{

width,

height,

borderRadius: 4,

backgroundColor: "#eee",

...style,

animation: "pulse 1.5s infinite",

}}

/>

);