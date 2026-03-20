export function moveCardInSameColumn(

cardIds: string[],

sourceIndex: number,

destinationIndex: number

) {

const updated = [...cardIds];

const [movedCard] = updated.splice(sourceIndex, 1);

updated.splice(destinationIndex, 0, movedCard);

return updated;

}



type MoveAcrossColumnsParams = {

sourceCardIds: string[];

destinationCardIds: string[];

sourceIndex: number;

destinationIndex: number;

};



export function moveCardAcrossColumns({

sourceCardIds,

destinationCardIds,

sourceIndex,

destinationIndex,

}: MoveAcrossColumnsParams) {

const sourceClone = [...sourceCardIds];

const destinationClone = [...destinationCardIds];



const [movedCard] = sourceClone.splice(sourceIndex, 1);

destinationClone.splice(destinationIndex, 0, movedCard);



return {

updatedSourceCardIds: sourceClone,

updatedDestinationCardIds: destinationClone,

movedCardId: movedCard,

};

}