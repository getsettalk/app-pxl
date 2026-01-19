import { View, Text } from 'react-native'
import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@service/reactQueryClient';
import RootNavigator from '@navigation/RootNavigator';


const App = () => {
  return (
    <QueryClientProvider client={queryClient} >
      <RootNavigator />
    </QueryClientProvider>
  )
}

export default App