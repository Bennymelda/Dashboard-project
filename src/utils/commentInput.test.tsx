import { describe, it, expect, vi } from "vitest";

import { render, screen, fireEvent } from "@testing-library/react";

import CommentInput from "../components/CommentInput";


describe("CommentInput logic", () => {

it("calls addComment with correct text when submitted", () => {

const addComment = vi.fn();



render(<CommentInput cardId="1" addComment={addComment} />);



// type in input

fireEvent.change(screen.getByPlaceholderText("Add a comment..."), {

target: { value: "Hello world" },

});



// click submit button

fireEvent.click(screen.getByText("Add comment"));



// assert function was called

expect(addComment).toHaveBeenCalledWith("1", "Hello world");

});



it("does not call addComment when input is empty", () => {

const addComment = vi.fn();



render(<CommentInput cardId="1" addComment={addComment} />);



// click submit without typing

fireEvent.click(screen.getByText("Add comment"));



expect(addComment).not.toHaveBeenCalled();

});

});