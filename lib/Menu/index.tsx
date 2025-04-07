import {
  Menu as SpMenu,
  MenuDivider as SpMenuDivider,
  MenuGroup as SpMenuGroup,
  MenuItem as SpMenuItem,
} from "@swc-react/menu";


export function MenuItem(
  props: React.ComponentProps<typeof SpMenuItem>
) {
  return <SpMenuItem {...props} />;
}

export function MenuDivider(
  props: React.ComponentProps<typeof SpMenuDivider>
) {
  return <SpMenuDivider {...props} />;
}
export function MenuGroup(
  props: React.ComponentProps<typeof SpMenuGroup>
) {
  return <SpMenuGroup {...props} />;
}
export function Menu(
  props: React.ComponentProps<typeof SpMenu>
) {
  return <SpMenu {...props} />;
}
