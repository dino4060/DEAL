import { StoreProvider } from "@/components/providers/store/StoreProvider";
import { TokenAuthProvider } from "@/components/providers/token/TokenAuthProvider";
import { GlobalDataProvider } from "@/components/providers/data/GlobalDataProvider";
import { TChildrenComponent } from "@/types/base.types";

export const AppProvider = ({ children }: TChildrenComponent) => {
  return (
    <StoreProvider>
      <TokenAuthProvider>
        <GlobalDataProvider>
          {children}
        </GlobalDataProvider>
      </TokenAuthProvider>
    </StoreProvider>
  )
}