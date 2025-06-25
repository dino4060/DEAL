// components/providers/data/GlobalDataProvider.tsx
import { TChildrenComponent } from "@/types/base.types";
import { GlobalDataInitializer } from "./GlobalDataInitializer";

export const GlobalDataProvider = ({ children }: TChildrenComponent) => {
  return (
    <GlobalDataInitializer>
      {children}
    </GlobalDataInitializer>
  );
};