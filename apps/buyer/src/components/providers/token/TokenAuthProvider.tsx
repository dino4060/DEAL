import { TChildrenComponent } from "@/types/base.types"
import { TokenAutoRefresher } from "./TokenAutoRefresher"
import { TokenGate } from "./TokenGate"

export const TokenAuthProvider = ({ children }: TChildrenComponent) => {
  return (
    <TokenGate>
      {children}
      <TokenAutoRefresher />
    </TokenGate>
  )
}