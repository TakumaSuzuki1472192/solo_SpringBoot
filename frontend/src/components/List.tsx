import React from "react";
import Notes from "./Notes";
import { Box, Flex, ScrollArea, MultiSelect } from "@mantine/core";
import { Res } from "./grobals";

interface Props {
  list: Res[];
  selectId: number | null;
  setSelectId: React.Dispatch<React.SetStateAction<number | null>>;
}

const List = ({ list, selectId, setSelectId }: Props) => {
  return (
    <>
      <Box style={{ height: "3rem", textAlign: "center" }}>
        <MultiSelect
          placeholder="Pick value"
          data={["React", "Angular", "Vue", "Svelte"]}
          searchable
          nothingFoundMessage="Nothing found..."
          mt={10}
        />
      </Box>
      <ScrollArea scrollbarSize={2} style={{ height: "75vh" }}>
        <Flex direction={"column"}>
          <Notes list={list} selectId={selectId} setSelectId={setSelectId} />
        </Flex>
      </ScrollArea>
    </>
  );
};

export default List;
