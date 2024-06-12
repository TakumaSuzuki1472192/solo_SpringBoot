import "./App.css";
import axios from "axios";
import { Title, Grid } from "@mantine/core";
import List from "./components/List";
import Edit from "./components/Edit";
import { useEffect, useState } from "react";
import { Res } from "./components/grobals";

function App() {
  const [list, setList] = useState<Res[]>([]);
  const [selectId, setSelectId] = useState<number | null>(null);
  const [viewNote, setViewNote] = useState<Res | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);

  const fetchList = async () => {
    try {
      const response = await axios.get<Res[]>("/api/notes");
      const notes = response.data;
      setList(notes);
      setSelectId(notes.length > 0 ? notes[0].id : null);
    } catch (error) {
      console.error("Error fetching list:", error);
    }
  };

  const fetchNote = async (id: number) => {
    try {
      const response = await axios.get<Res[]>(`/api/notes/${id}`);
      setViewNote(response.data[0]);
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, [refresh]);

  useEffect(() => {
    if (selectId !== null) {
      fetchNote(selectId);
    } else {
      setViewNote(null);
    }
  }, [selectId]);

  return (
    <>
      <Title order={1} mb="1rem">
        SPRING Note
      </Title>
      <Grid
        columns={24}
        justify="space-around"
        align="stretch"
        style={{ overflow: "hidden" }}
      >
        <Grid.Col span={9} style={{ backgroundColor: "gray", height: "85vh" }}>
          <List
            list={list}
            selectId={selectId}
            setSelectId={setSelectId}
            editFlag={editFlag}
          />
        </Grid.Col>
        <Grid.Col span={14} style={{ backgroundColor: "gray", height: "85vh" }}>
          <Edit
            selectId={selectId}
            viewNote={viewNote}
            setRefresh={setRefresh}
            setEditFlag={setEditFlag}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default App;
