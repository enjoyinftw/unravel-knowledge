import { useEffect, useState } from "react";
import { type ListComponentProps } from "./ListComponent";
import ListComponent from "./ListComponent";
import { fetchListData } from "@/services/listService";
import { ListItemProps } from "./ListItem";

type ListContainerProps = {
  fetchData?: () => Promise<ListItemProps[]>
}

const ListContainer = ({fetchData = fetchListData}: ListContainerProps) => {
  const [state, setState] = useState<ListComponentProps>({
    isLoading: true,
    items: [],
    errorMsg: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const newData = await fetchData();
        setState({ isLoading: false, items: newData, errorMsg: "" });
      } catch (err) {
        setState({ isLoading: false, items: [], errorMsg: "Error" });
      }
    };
    loadData();
  }, []);

  return <ListComponent {...state} />;
};

export default ListContainer;
