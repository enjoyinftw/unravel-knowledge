export type ListItemProps = {
  content?: string;
  id: string;
};

const ListItem = ({ content = "", id }: ListItemProps) => {
  return <li data-testid={id}>{content}</li>;
};

export default ListItem;
