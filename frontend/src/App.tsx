import "./App.css";
import axios from "axios";
import { Title, Grid } from "@mantine/core";
import List from "./components/List";
import Edit from "./components/Edit";
import { useEffect, useState } from "react";
import { Res } from "./components/grobals";

function App() {
  const fetchList = async (): Promise<void> => {
    const list = await axios("/api/notes").then((res) => res.data);
    setList(list);
    setSelectId(list.length > 0 ? list[0].id : null);
  };

  const [list, setList] = useState<Res[]>([]);
  const [selectId, setSelectId] = useState<number | null>(null);
  const [viewNote, setViewNote] = useState<Res | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    fetchList();
  }, [refresh]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (selectId !== null) {
        const note: Res[] = await axios(`/api/notes/${selectId}`).then(
          (res) => res.data
        );
        setViewNote(note[0]);
      } else {
        setViewNote(null);
      }
    };
    fetchData();
  }, [selectId]);

  return (
    <>
      <Title order={1} mb={"1rem"}>
        SPRING Note
      </Title>
      <Grid
        columns={24}
        justify="space-around"
        align="stretch"
        overflow="hidden"
      >
        <Grid.Col span={9} bg={"gray"} style={{ height: "85vh" }}>
          <List list={list} selectId={selectId} setSelectId={setSelectId} />
        </Grid.Col>
        <Grid.Col span={14} bg={"gray"}>
          <Edit
            selectId={selectId}
            viewNote={viewNote}
            setRefresh={setRefresh}
          />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default App;
