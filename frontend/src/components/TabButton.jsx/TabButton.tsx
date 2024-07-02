type TabButtonProps = { children: string };

export default function TabButton(props: TabButtonProps) {
  return (
    <>
      <li>
        <button>{props.children}</button>
      </li>
    </>
  );
}
