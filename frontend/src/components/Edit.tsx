import React, { useEffect, useState, ChangeEvent } from "react";
import { Box, Button, Textarea } from "@mantine/core";
import axios from "axios";
import { Res } from "./grobals";

interface Props {
  selectId: number | null;
  viewNote: Res | null;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setEditFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

const Edit = ({ selectId, viewNote, setRefresh, setEditFlag }: Props) => {
  const [viewContent, setViewContent] = useState<string>("");
  const [postTimer, setPostTimer] = useState<number | null>(null);

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

  const patchNote = async (content: string) => {
    await axios.patch(`/api/notes/${selectId}`, {
      title: content.split("\n")[0],
      text: content.split("\n").slice(2).join("\n"),
    });
    setEditFlag(false);
    setRefresh((prev) => !prev);
  };
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.currentTarget.value; // 一回変数に入れないと再レンダリングまでviewContentが変わらずバグる
    setViewContent(e.currentTarget.value);
    setEditFlag(true);
    if (postTimer) {
      clearTimeout(postTimer);
    }
    setPostTimer(
      setTimeout(() => {
        patchNote(newVal);
      }, 2000)
    );
  };
  const handleBlur = () => {
    if (postTimer) {
      clearTimeout(postTimer);
    }
    patchNote(viewContent);
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
        placeholder={`タイトルを入力\n\n本文を入力`}
        onChange={handleChange}
        onBlur={handleBlur}
        value={viewContent}
      ></Textarea>
    </>
  );
};

export default Edit;
