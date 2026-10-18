export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="relative h-screen w-full overflow-hidden bg-(--color-bg)"
    >
      <div className="absolute top-1/2 left-1/2 h-7.5 w-7.5 animate-up bg-(--color-accent)" />
      <div className="absolute top-[calc(50%-30px)] left-[calc(50%-30px)] h-7.5 w-7.5 animate-down bg-[color-mix(in_srgb,var(--color-accent)_35%,var(--color-bg))]" />
      <span className="sr-only">Loading…</span>
      <style>
        {`
          .animate-up {
            animation: n-loading-up 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
          }
          .animate-down {
            animation: n-loading-down 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
          }
          @keyframes n-loading-down {
            0%, 100% {
              transform: none;
            }
            25% {
              transform: translateX(100%);
            }
            50% {
              transform: translateX(100%) translateY(100%);
            }
            75% {
              transform: translateY(100%);
            }
          }
          @keyframes n-loading-up {
            0%, 100% {
              transform: none;
            }
            25% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(-100%) translateY(-100%);
            }
            75% {
              transform: translateY(-100%);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-up, .animate-down {
              animation: none;
            }
          }
        `}
      </style>
    </div>
  );
}
