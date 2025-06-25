'use client'
import { navigationMenuItemStyle } from '@/components/ui/navigation-menu';
import { api } from "@/lib/api";
import { clientFetch } from "@/lib/fetch/fetch.client";
import { actions } from '@/store';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { TUser } from "@/types/auth.types";
import { BadgeCheckIcon, BellIcon, CreditCardIcon, LogOutIcon, MessageCircleMore, SettingsIcon, SquareMenu, UserRound, UserRoundIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import { NavigationLinkItem } from "../ui/custom/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";

const NavAccount = ({ currentUser }: { currentUser: TUser }) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const onLogout = async () => {
    const res = await clientFetch(api.auth.logout())

    if (res.success) {
      console.log(">>> NavAccount: Log out: isAuthenticated: ", res.data.isAuthenticated)
      dispatch(actions.auth.clear())
      dispatch(actions.address.clear())
      router.refresh();
    } else {
      toast.error(res.error)

    }
  }

  return (
    <NavigationMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger className={navigationMenuItemStyle()} asChild>
          <div className="group flex flex-col xl:flex-row text-xs xl:text-sm items-center gap-0.5">
            <UserRoundIcon className="w-5" />
            <span>{`Hi ${currentUser.name ?? currentUser.email}`}</span>

          </div>

        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheckIcon color="black" />
              <span>Hồ sơ</span>

            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCardIcon color="black" />
              <span>Thanh toán</span>

            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellIcon color="black" />
              <span>Thông báo</span>

            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon color="black" />
              <span>Cài đặt</span>

            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onLogout}>
            <LogOutIcon className="text-red-500" />
            <span className="text-red-500">Log out</span>

          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </NavigationMenuItem>
  )
}

export const NavRight = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-0">
        {currentUser
          ? (<NavAccount currentUser={currentUser} />)
          : (<NavigationLinkItem href='/auth' icon={<UserRound />}>
            Đăng nhập / kí
          </NavigationLinkItem>)}

        <NavigationLinkItem href='/inbox' icon={<MessageCircleMore />}>
          Nhắn tin
        </NavigationLinkItem>

        <NavigationLinkItem href='/orders' icon={<SquareMenu />}>
          Đơn hàng
        </NavigationLinkItem>
      </NavigationMenuList>
    </NavigationMenu >
  );
};