"use client";

type StockButtonProps = {
  onDraw?: () => void;
  disabled?: boolean;
};

export function StockButton({
  onDraw,
  disabled = false,
}: StockButtonProps) {
  return (
    <button
      onClick={onDraw}
      disabled={disabled}
      className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Robar ficha
    </button>
  );
}

export default StockButton;