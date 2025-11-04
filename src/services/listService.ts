import { FakeData } from "@/components/ItemList/ListComponent";
import type { ListItemProps } from "@/components/ItemList/ListItem";

export const fetchListData = async():Promise<ListItemProps[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(FakeData), 1000)
  })
};
