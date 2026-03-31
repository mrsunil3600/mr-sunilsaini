export const BackgroundAura = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-[-120px] h-[260px] w-[260px] -translate-x-1/2 rounded-full bg-violet-500/24 blur-2xl cosmic-orb sm:top-[-140px] sm:h-[420px] sm:w-[420px] sm:blur-3xl" />
      <div className="absolute -left-24 top-1/3 hidden h-[320px] w-[320px] rounded-full bg-mint-500/16 blur-3xl cosmic-orb sm:block" />
      <div className="absolute -right-8 bottom-[-40px] h-[170px] w-[170px] rounded-full bg-accent-300/14 blur-2xl cosmic-orb sm:-right-16 sm:bottom-[-80px] sm:h-[300px] sm:w-[300px] sm:blur-3xl" />
    </div>
  );
};
