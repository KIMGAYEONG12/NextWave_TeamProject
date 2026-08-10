import { Check, LucideProps } from "lucide-react";

const iconMap = {
  check: Check,
};

export function Icon({
  name,
  ...props
}: { name: keyof typeof iconMap } & LucideProps) {
  const LucideIcon = iconMap[name];
  if (!LucideIcon) return null;
  return <LucideIcon {...props} />;
}
