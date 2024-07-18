'use client' // See https://chakra-ui.com/getting-started/nextjs-app-guide#setup-provider

import { ChakraProvider} from '@chakra-ui/react'
import React from 'react'

export const ChakraClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider>{children}</ChakraProvider>
}