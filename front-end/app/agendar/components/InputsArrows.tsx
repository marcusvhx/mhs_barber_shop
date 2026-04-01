export default function InputsArrow({
  handleFormStage,
  direction,
  disabled,
}: {
  direction: "r" | "l";
  handleFormStage: (direction: "r" | "l") => void;
  disabled?: boolean;
}) {
  return (
    <button
    type="button"
      disabled={disabled}
      onClick={() => handleFormStage(direction)}
      className={`
        disabled:cursor-default disabled:brightness-75
        w-fit py-1 px-3
        bg-primary enabled:hover:bg-secondary
        text-background text-nowrap
        rounded-full
        transition-all cursor-pointer
        `}
    >
      {direction === "r" ? "Próximo ►" : "◄ Anterior"}
    </button>
  );
}
