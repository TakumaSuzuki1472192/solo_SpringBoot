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
  return (
    <>
      {viewList.map((note) => {
        const viewTime =
          note.updatedAt !== null
            ? new Date(note.updatedAt)
            : new Date(note.createdAt);

        const time = dayjs(viewTime);
        return (
          <Card
            bg={note.id === selectId ? "powderblue" : "white"}
            key={note.id}
            mt={3}
            mb={3}
            onClick={() => setSelectId(note.id)}
          >
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{note.title}</Text>

              {note.id === selectId && editFlag ? (
                <Badge color="pink">writing</Badge>
              ) : (
                <Badge color="blue">saved</Badge>
              )}
            </Group>

            <Button color="blue" fullWidth mt="md" radius="md">
              update : {time.fromNow()}
            </Button>
          </Card>
        );
      })}
    </>
  );
};

export default Notes;
