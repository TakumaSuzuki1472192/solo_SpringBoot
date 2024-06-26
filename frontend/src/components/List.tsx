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
    const titles = [...new Set(list.map((note) => note.title))].filter(
      (title): title is string => title !== null && title !== ""
    );
    setUniqueTitles(titles);
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
      <Box mb={3}>
        <MultiSelect
          placeholder="検索ワードを入力"
          data={uniqueTitles}
          nothingFoundMessage="Nothing found..."
          mt={10}
          onChange={handleChange}
          clearable
          searchable
        />
      </Box>
      <ScrollArea scrollbarSize={2} style={{ height: "75vh" }}>
        <Flex direction="column">
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
