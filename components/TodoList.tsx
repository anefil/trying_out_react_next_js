'use client';

import { dataCell } from "@/logic/todoData";
import { Box, Button, Checkbox, Grid, GridItem, HStack, IconButton, Input, List, ListItem, Text } from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { useRef } from "react";


export default function TodoList(
    {currentTODOlist, setCompletionState, addNewElement}: 
    {
        currentTODOlist: dataCell[], 
        setCompletionState: (idx: number, state: boolean) => void,
        addNewElement: (text: string) => void
    }
) {
    return (
        <>
        <Grid templateColumns="min-content 1fr min-content" alignItems="center" columnGap="2" width="fit-content">
            {
                currentTODOlist.map((v,i) => {
                    return (
                        <>
                        <GridItem key={v.timeID+"checkbox"}>
                            <Checkbox mt="4px" defaultChecked={v.completed} onChange={ev => setCompletionState(v.timeID,(ev.currentTarget as HTMLInputElement).checked)}/>
                        </GridItem>
                        <GridItem key={v.timeID+"text"}>
                            <Text>
                                {v.text}
                            </Text>
                        </GridItem>
                        <GridItem key={v.timeID+"icon"}>
                            <IconButton size="sm" icon={<EditIcon/>} variant="ghost" aria-label={"Edit item"}></IconButton>
                        </GridItem>
                        </>
                    );
                })
            }
            <Box gridColumn="1 /  4">
            </Box>
        </Grid>
            <TodoListAddNew key="last" addNewElement={addNewElement}/>
        </>
    )
}


export function TodoListAddNew({addNewElement}:{addNewElement: (text: string) => void}) {
    let newTODOinput = useRef(null as unknown as HTMLInputElement);
    return (
        <HStack spacing="2">
                <Input placeholder="New TODO text..." ref={newTODOinput}/>
                <Button onClick={() => {
                    addNewElement(newTODOinput.current.value);
                    newTODOinput.current.value = "";
                }}>
                    <AddIcon mr="2"/>Add</Button>
        </HStack>
    )
}