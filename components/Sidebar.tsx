'use client';

import { Box, Flex, IconButton, Button } from "@chakra-ui/react";
import Image from "next/image";
import { HamburgerIcon, SmallCloseIcon, ChatIcon, AddIcon } from "@chakra-ui/icons";
import { useMemo, useState } from "react";
import styles from "@/components/Sidebar.module.css";
import { Fade, Slide } from "@chakra-ui/transition";




export default function Sidebar() {
    var [isOpened, setOpened] = useState(false);
    var [classnames,setClassnames] = useState(styles["menu"]);

    function changeState() {
        if(isOpened) { // i.e. will NOT be opened
            setClassnames(
                ["menu", "close"].map(v=>styles[v]).join(" ")
            )
        } else {
            setClassnames(
                ["menu", "open"].map(v=>styles[v]).join(" ")
            )
        }
        setOpened(!isOpened);
    }
    
    return (
        <>
        <Flex 
            minW="32" boxShadow="md" 
            px="5" py="5"
            h="100%" mr="6" 
            alignItems="center" justify="start" 
            gap="10"  direction="column"
            position="relative" zIndex="8"
            >
            {/* what are the options for colorScheme? it looks as if it doesn't change anything. */}
            <IconButton icon={<HamburgerIcon/>} onClick={changeState} variant="ghost" rounded="full" aria-label="Open menu"/>
            <Flex direction="column" alignItems="center" p="2">
                {/* <IconButton icon={<ChatIcon/>} variant="solid" aria-label="Current TODO"/>
                <p>Current</p> */}
            </Flex>
            {/* <Flex direction="column" alignItems="center" p="2">
                <IconButton variant="outline">
                    <AddIcon/>
                </IconButton>
                <p>Add new</p>
            </Flex> */}
            {/* TODO next commit */}
        </Flex>
        <Flex 
            minW="32" boxShadow="md" 
            px="5" py="5"
            h="100%"
            alignItems="center" justify="start" 
            gap="10"  direction="column"
            position="absolute" zIndex="8"
            className={classnames}
            >
            {/* what are the options for colorScheme? it looks as if it doesn't change anything. */}
            <IconButton icon={<SmallCloseIcon/>} onClick={changeState} variant="outline" rounded="full" aria-label=""/>
            {/* <Button >
                
            </Button> */}
            There is nothing here! (For now)
        </Flex>
        </>
    )
}