import React, { useEffect, useState } from "react";
import Notes from "./Notes";
import { Box, Flex, ScrollArea, MultiSelect } from "@mantine/core";
import { Res } from "./grobals";

interface Props {
  list: Res[];
  selectId: number | null;
  setSelectId: React.Dispatch<React.SetStateAction<number | null>>;
  editFlag: boolean;
}

const List = ({ list, selectId, setSelectId, editFlag }: Props) => {
  const [viewList, setViewList] = useState<Res[]>(list);
  const [uniqueTitles, setUniqueTitles] = useState<string[]>([]);
  useEffect(() => {
    setViewList(list);
    setUniqueTitles(
      [...new Set(list.map((note) => note.title))].filter(
        (title): title is string => title !== null && title !== ""
      )
    );
  }, [list]);

  const handleChange = (pickValues: string[]) => {
    if (pickValues.length > 0) {
      setViewList(list.filter((note) => pickValues.includes(note.title ?? "")));
    } else {
      setViewList(list);
    }
  };

  return (
    <>
      <Box style={{ height: "3rem", textAlign: "center" }}>
        <MultiSelect
          placeholder="Pick value"
          data={uniqueTitles}
          nothingFoundMessage="Nothing found..."
          mt={10}
          onChange={handleChange}
          clearable
          searchable
          style={{ zIndex: 10, position: "relative" }}
        />
      </Box>
      <ScrollArea scrollbarSize={2} style={{ height: "75vh" }}>
        <Flex direction={"column"}>
          <Notes
            list={list}
            viewList={viewList}
            selectId={selectId}
            setSelectId={setSelectId}
            editFlag={editFlag}
          />
        </Flex>
      </ScrollArea>
    </>
  );
};

export default List;
