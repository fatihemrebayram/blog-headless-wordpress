'use client'
import React from 'react'

type Props = {
   children: React.ReactNode
}

interface contextProps {
   value: string
   setValue: React.Dispatch<React.SetStateAction<string>>
}

const GlobalContext = React.createContext<contextProps>({
   value: 'dark',
   setValue: () => {},
})

export const GlobalProvider = ({ children }: Props) => {
   const [value, setValue] = React.useState('dark')

   return (
      <GlobalContext.Provider
         value={{
            value,
            setValue,
         }}
      >
         {children}
      </GlobalContext.Provider>
   )
}

export const useGlobalContext = () => React.useContext(GlobalContext)
