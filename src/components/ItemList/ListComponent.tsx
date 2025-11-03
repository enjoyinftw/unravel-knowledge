import type { ListItemProps } from "@/components/ItemList/ListItem";
import ListItem from "@/components/ItemList/ListItem";

export const FakeData: ListItemProps[] = [
  {
    id: "1",
    content: "hello",
  },
  {
    id: "2",
    content: "world",
  },
  {
    id: "3",
    content: "what a lovely day",
  },
];

type ListComponentState = {
  items: ListItemProps[];
  isLoading: boolean;
  errorMsg: string;
};

type ListComponentProps = {
  state: ListComponentState;
};

const ListComponent = ({ state: { items, isLoading, errorMsg } }: ListComponentProps) => {
  if (isLoading) return <p>Loading</p>;
  if (errorMsg) return <p>{errorMsg}</p>;
  if (items.length === 0) return <p>No items.</p>;
  return (
    <ol>
      {items.map(({ id, content }) => (
        <ListItem
          key={id}
          id={id}
          content={content}
        />
      ))}
    </ol>
  );
};

export default ListComponent;
