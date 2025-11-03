type ListItemProps = {
  content?: string;
  itemKey: string;
};

const ListItem = ({ content = "", itemKey }: ListItemProps) => {
  return (
    <li
      key={itemKey}
      data-testid={itemKey}
    >
      {content}
    </li>
  );
};

export default ListItem;
