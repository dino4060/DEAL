// components/providers/data/GlobalDataProvider.tsx
import { TChildrenComponent } from "@/types/base.types";
import { DataInitializer } from "./DataInitializer";

export const GlobalDataProvider = ({ children }: TChildrenComponent) => {
  return (
    <DataInitializer>
      {children}
    </DataInitializer>
  );
};