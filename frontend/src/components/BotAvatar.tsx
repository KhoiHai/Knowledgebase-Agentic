import { Sparkles } from "lucide-react";

export default function BotAvatar({ size = "md" }: { size?: "md" | "lg" }) {
  const box = size === "lg" ? "size-12" : "size-10";
  const icon = size === "lg" ? "size-6" : "size-5";
  return (
    <div className={`${box} grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow ring-4 ring-brand-100`}>
      <Sparkles className={icon} strokeWidth={2.2} />
    </div>
  );
}
