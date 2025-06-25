import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Gem, Ticket, Zap } from "lucide-react";
import React from "react";
import { NavigationDropdownItem, NavigationLinkItem } from "@/components/ui/custom/navigation-menu";
import { ListItem } from "@/components/ui/navigation-menu";
import { api } from "@/lib/api";
import { serverFetch } from "@/lib/fetch/fetch.server";

const CategoryDropdown = async () => {
  const categories = (await serverFetch(api.category.getTree())).data;

  return (
    <ul className="w-[400px] md:w-[500px] lg:w-[800px] grid md:grid-cols-6 gap-2 p-4">
      {categories.map((item) => (
        <ListItem
          key={item.id}
          title={item.name}
          href={`/category/${item.id}`}
        />
      ))}
    </ul>
  );
}

export const NavLeft = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-0">
        <NavigationLinkItem href='/flash-sale' icon={<Zap />}>
          Flash sale
        </NavigationLinkItem>

        <NavigationLinkItem href='/mall' icon={<Gem />}>
          Mall
        </NavigationLinkItem>

        <NavigationLinkItem href='/coupons' icon={<Ticket />} iconClassName='w-5 -rotate-45'>
          Coupons
        </NavigationLinkItem>

        <NavigationDropdownItem dropdown={<CategoryDropdown />} >
          Ngành hàng
        </NavigationDropdownItem>
      </NavigationMenuList>
    </NavigationMenu >
  );
};