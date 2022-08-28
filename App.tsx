import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider as PaperProvider } from 'react-native-paper';
import Main from './src'

const App = () => {
  return (
    <PaperProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Main />
      </GestureHandlerRootView>
    </PaperProvider>
  )
}

export default App