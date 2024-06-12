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

  useEffect(() => {
    if (viewNote?.title || viewNote?.text) {
      setViewContent(`${viewNote.title}\n\n${viewNote.text}`);
    } else {
      setViewContent("");
    }
  }, [viewNote]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.currentTarget.value;
    setViewContent(newContent);
    setEditFlag(true);

    if (postTimer) {
      clearTimeout(postTimer);
    }

    setPostTimer(
      setTimeout(() => {
        patchNote(newContent); //NOTE:ここでViewContent使うと再レンダリングまで値が変わらずバグる
      }, 2000)
    );
  };

  const handleBlur = () => {
    if (postTimer) {
      clearTimeout(postTimer);
    }
    patchNote(viewContent);
  };

  const deleteNote = async () => {
    if (selectId !== null) {
      await axios.delete(`/api/notes/${selectId}`);
      setRefresh((prev) => !prev);
    }
  };

  const newNote = async () => {
    await axios.post(`/api/notes`);
    setRefresh((prev) => !prev);
  };

  const patchNote = async (content: string) => {
    if (selectId !== null) {
      await axios.patch(`/api/notes/${selectId}`, {
        title: content.split("\n")[0],
        text: content.split("\n").slice(2).join("\n"),
      });
      setEditFlag(false);
      setRefresh((prev) => !prev);
    }
  };

  return (
    <>
      <Box mt={13} style={{ height: "3rem", textAlign: "center" }}>
        <Button onClick={deleteNote}>Delete</Button>
        <Button onClick={newNote}>New</Button>
      </Box>

      <Textarea
        id="mantineTextarea"
        placeholder="タイトルを入力\n\n本文を入力"
        onChange={handleChange}
        onBlur={handleBlur}
        value={viewContent}
        size="lg"
      />
    </>
  );
};

export default Edit;
