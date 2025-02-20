import Image from "next/image";
import logo from '../../public/logo.png';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header(props) {
  return (
    <header className="flex flex-row items-center justify-between section-p gap-10">
      <div className="flex items-center gap-2">
        <Image src={logo} width={50} height={50} className="cursor" alt="logo"/>
        <h2 className="font-bold text-[1.7rem]">FootPrintly</h2>
      </div>
      <DropdownMenu className="border-none outline-none">
        <DropdownMenuTrigger className="border-b-2 py-[4px] focus:outline-none">Settings <SettingsIcon/> </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default Header;
