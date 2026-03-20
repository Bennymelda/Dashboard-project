import { describe, it, expect } from "vitest";

import {

moveCardInSameColumn,

moveCardAcrossColumns,

} from "./dragUtils";



describe("drag logic", () => {

it("moves a card within the same column", () => {

const result = moveCardInSameColumn(["card1", "card2", "card3"], 0, 2);



expect(result).toEqual(["card2", "card3", "card1"]);

});



it("moves a card across columns", () => {

const result = moveCardAcrossColumns({

sourceCardIds: ["card1", "card2"],

destinationCardIds: ["card3", "card4"],

sourceIndex: 1,

destinationIndex: 1,

});



expect(result).toEqual({

updatedSourceCardIds: ["card1"],

updatedDestinationCardIds: ["card3", "card2", "card4"],

movedCardId: "card2",

});

});

});