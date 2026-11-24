export function SectionHeader({
  eyebrow,
  icon,
  rightSlot,
}: {
  eyebrow: string;
  icon?: React.ReactNode;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
      <div className="inline-flex items-center gap-2 text-[11.5px] font-bold tracking-[0.1em] uppercase text-[#626952]">
        {icon && (
          <span className="text-[#4F5D2F]" aria-hidden="true">
            {icon}
          </span>
        )}
        <span>{eyebrow}</span>
      </div>
      {rightSlot && <div>{rightSlot}</div>}
    </div>
  );
}
