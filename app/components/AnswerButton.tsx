type Props = {
  text: string;
  onClick(): void;
  disabled?: boolean;
};

export default function AnswerButton({
  text,
  onClick,
  disabled,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-2xl bg-slate-800 p-5 text-left font-semibold transition hover:bg-slate-700 disabled:opacity-60"
    >
      {text}
    </button>
  );
}