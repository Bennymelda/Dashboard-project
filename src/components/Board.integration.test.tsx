import {  render, screen, within } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { MemoryRouter, Route, Routes } from "react-router-dom";

import { vi } from "vitest";

import { AppContext } from "../context/AppContext";

import Board from "../pages/Board";



test("Board integration: renders board and allows adding a comment", async () => {

const addComment = vi.fn();



const boards = [{ id: "board1", title: "Test Board", description: "test", createdAt: new Date(), columnIds: ["col1"] }];

const columns = { col1: { id: "col1", title: "Column 1", cardIds: ["card1"] } };

const cards = { card1: { id: "card1", title: "Card 1", description: "Test card", tags: [], dueDate: null } };



render(

<AppContext.Provider

value={{

boards, columns, cards, comments: {}, cardComments: { card1: [] },

isLoading: false, setIsLoading: vi.fn(), history: [], undoStack: [], redoStack: [],

theme: "light", setTheme: vi.fn(), undo: vi.fn(), redo: vi.fn(),

addBoard: vi.fn(), deleteBoard: vi.fn(), addColumn: vi.fn(), addCard: vi.fn(),

editColumn: vi.fn(), deleteColumn: vi.fn(), editCard: vi.fn(), deleteCard: vi.fn(),

moveCard: vi.fn(), addComment, replyToComment: vi.fn(),

editComment: vi.fn(), deleteComment: vi.fn(),

}}

>

<MemoryRouter initialEntries={["/board/board1"]}>

<Routes>

<Route path="/board/:boardId" element={<Board />} />

</Routes>

</MemoryRouter>

</AppContext.Provider>

);



// Verify column and card render

expect(screen.getByText("Column 1")).toBeInTheDocument();

const card = screen.getByText("Card 1");

expect(card).toBeInTheDocument();



// Get card wrapper

const cardContainer = card.closest("div")!;



// Open comment input

const addCommentBtn = within(cardContainer).getByText(/Add Comment/i);

await userEvent.click(addCommentBtn);



// Type comment inside this card

const commentInput = within(cardContainer).getByPlaceholderText(/Add a comment/i);

await userEvent.type(commentInput, "Test comment");



// Click submit button

const submitBtn = within(cardContainer).getByRole("button", { name: /Add comment/i });

await userEvent.click(submitBtn);



// Verify addComment called correctly

expect(addComment).toHaveBeenCalledWith("card1", "Test comment");

});