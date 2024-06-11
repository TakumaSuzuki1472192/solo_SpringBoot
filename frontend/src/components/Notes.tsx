import React from "react";
import { Card, Group, Text, Button, Badge } from "@mantine/core";
import { Res } from "./grobals";

interface Props {
  list: Res[];
  selectId: number | null;
  setSelectId: React.Dispatch<React.SetStateAction<number | null>>;
}

const Notes = ({ list, selectId, setSelectId }: Props) => {
  return (
    <>
      {list.map((note) => {
        const viewTime =
          note.updatedAt !== null
            ? new Date(note.updatedAt)
            : new Date(note.createdAt);
        const formattedTime = viewTime.toLocaleString();
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
              <Badge color="pink">On Sale</Badge>
            </Group>

            <Text size="sm" c="dimmed">
              {note.text}
            </Text>

            <Button color="blue" fullWidth mt="md" radius="md">
              {formattedTime}
            </Button>
          </Card>
        );
      })}
    </>
  );
};

export default Notes;
