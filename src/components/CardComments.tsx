import { useContext } from "react";

import { AppContext } from "../context/AppContext";

import { CommentItem } from "./commentItem";



type Props = {

cardId: string;

};



export const CardComments = ({ cardId }: Props) => {



const context = useContext(AppContext);



if (!context) return null;



const { cardComments } = context;



const commentIds = cardComments[cardId] || [];



return (

<div className=" font-bold text-white">

{commentIds.map((id) => (

<CommentItem key={id} commentId={id} />

))}

</div>

);

};