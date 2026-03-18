export const BackgroundAura = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-[-140px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="absolute -left-24 top-1/3 h-[320px] w-[320px] rounded-full bg-mint-500/18 blur-3xl" />
      <div className="absolute -right-16 bottom-[-80px] h-[300px] w-[300px] rounded-full bg-sky-400/18 blur-3xl" />
    </div>
  );
};