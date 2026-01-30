import { NavbarRoot } from "./Navbar";
import { NavbarBrand } from "./NavbarBrand";
import { NavbarItems } from "./NavbarItems";
import { NavbarItem } from "./NavbarItem";
import { NavbarActions } from "./NavbarActions";

export const Navbar = Object.assign(NavbarRoot, {
  Brand: NavbarBrand,
  Items: NavbarItems,
  Item: NavbarItem,
  Actions: NavbarActions,
});

export default Navbar;
