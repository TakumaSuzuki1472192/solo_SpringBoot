import React from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { Card, Group, Text, Button, Badge } from "@mantine/core";
import { Res } from "./grobals";
import dayjs, { extend } from "dayjs";
import "dayjs/locale/ja";
import relativeTime from "dayjs/plugin/relativeTime";

extend(relativeTime);
dayjs.locale("ja");

interface Props {
  list: Res[];
  viewList: Res[];
  selectId: number | null;
  setSelectId: React.Dispatch<React.SetStateAction<number | null>>;
  editFlag: boolean;
}

const Notes = ({ viewList, selectId, setSelectId, editFlag }: Props) => {
  const handleCardClick = (id: number) => {
    setSelectId(id);
  };

  const renderNote = (note: Res) => {
    const viewTime =
      note.updatedAt !== null
        ? new Date(note.updatedAt)
        : new Date(note.createdAt);
    const time = dayjs(viewTime);

    return (
      <Flipped key={note.id} flipId={note.id}>
        {(flippedProps) => (
          <div {...flippedProps}>
            <Card
              bg={note.id === selectId ? "powderblue" : "white"}
              mt={7}
              mb={10}
              shadow="0px 2px 2px gray"
              onClick={() => handleCardClick(note.id)}
              style={{ cursor: "pointer" }}
            >
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{note.title}</Text>
                <Badge
                  color={note.id === selectId && editFlag ? "pink" : "blue"}
                >
                  {note.id === selectId && editFlag ? "writing" : "saved"}
                </Badge>
              </Group>
              <Card.Section mt="sm">
                <Text
                  c={"white"}
                  size="sm"
                  fw={500}
                  bg={"#228BE6"}
                  p={"5 20"}
                  style={{ textAlign: "end" }}
                >
                  update : {time.fromNow()}
                </Text>
              </Card.Section>
            </Card>
          </div>
        )}
      </Flipped>
    );
  };

  return (
    <Flipper flipKey={viewList.map((note) => note.id).join(",")}>
      {viewList.map(renderNote)}
    </Flipper>
  );
};

export default Notes;
