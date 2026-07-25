type Props = {
  roomId: string;
  uid: string;
};

const emojis = [
  "😂",
  "😎",
  "😡",
  "🔥",
  "👏",
  "❤️",
];

export default function Reactions({
  roomId,
  uid,
}: Props) {
  return (
    <div className="flex gap-2">

      {emojis.map((emoji) => (
        <button
          key={emoji}
          className="text-3xl"
          onClick={() => {
            import("@/services/reactions").then(
              ({ sendReaction }) =>
                sendReaction(
                  roomId,
                  uid,
                  emoji
                )
            );
          }}
        >
          {emoji}
        </button>
      ))}

    </div>
  );
}