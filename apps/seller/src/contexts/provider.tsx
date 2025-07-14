import type { TChildrenComponent } from "../types/base.types"
import { AuthContextProvider } from "./auth.context"
import { MessageContextProvider } from "./message.context"

export const StoreProvider = ({ children }: TChildrenComponent) => {
  return (
    <MessageContextProvider>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </MessageContextProvider>
  )
}