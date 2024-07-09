import styles from "./TabButton.module.css";

type TabButtonProps = {
  children: string;
  OnManualCapture: () => void;
  isSelected: boolean;
};

export default function TabButton({
  children,
  OnManualCapture,
  isSelected,
}: TabButtonProps) {
  return (
    <>
      <li>
        <button
          className={isSelected ? styles.active : undefined}
          onClick={OnManualCapture}
        >
          {children}
        </button>
      </li>
    </>
  );
}
