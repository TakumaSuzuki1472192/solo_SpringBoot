import React, { useEffect, useState, ChangeEvent } from "react";
import { Box, Button, Textarea } from "@mantine/core";
import axios from "axios";
import { Res } from "./grobals";

interface Props {
  selectId: number | null;
  viewNote: Res | null;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const Edit = ({ selectId, viewNote, setRefresh }: Props) => {
  const [viewContent, setViewContent] = useState<string>("");

  const deleteNote = async () => {
    if (selectId !== null) {
      await axios.delete(`/api/notes/${selectId}`);
      setRefresh((prev) => !prev);
    }
  };
  const newNote = async () => {
    if (selectId !== null) {
      await axios.post(`/api/notes`);
      setRefresh((prev) => !prev);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setViewContent(e.currentTarget.value);
  };

  useEffect(() => {
    if (viewNote?.title || viewNote?.text) {
      setViewContent(`${viewNote.title}\n\n${viewNote.text}`);
    } else {
      setViewContent("");
    }
  }, [viewNote]);

  return (
    <>
      <Box mt={13} style={{ height: "3rem", textAlign: "center" }}>
        <Button onClick={() => deleteNote()}>Delete</Button>
        <Button onClick={() => newNote()}>New</Button>
      </Box>

      <Textarea
        id="mantaineTextarea"
        h={"75vh"}
        placeholder={`タイトルを入力\n\n本文を入力`}
        onChange={handleChange}
        value={viewContent}
      ></Textarea>
    </>
  );
};

export default Edit;
