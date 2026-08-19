export function KravexLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <span className="flex items-center gap-2.5">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="text-gold"
        >
          <path
            d="M12 1.5 22.5 12 12 22.5 1.5 12 12 1.5Z"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          <path
            d="M12 6.5 17.5 12 12 17.5 6.5 12 12 6.5Z"
            fill="currentColor"
            fillOpacity="0.9"
          />
        </svg>
        <span className="font-sans text-[15px] font-semibold tracking-tight text-foreground">
          Kravex<span className="text-gold"> AI</span>
        </span>
      </span>
    </div>
  )
}
