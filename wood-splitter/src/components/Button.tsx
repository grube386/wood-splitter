type ButtonVariant = 'primary' | 'ghost' | 'inverted';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-red text-surface-white hover:bg-brand-red-hover',
  ghost:
    'bg-transparent border-2 border-surface-white text-surface-white hover:bg-surface-white hover:text-dark',
  inverted:
    'bg-surface-white text-brand-red hover:bg-surface-light',
};

const base =
  'inline-flex items-center justify-center h-12 px-8 rounded-[4px] font-heading text-base tracking-wider uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red min-w-[44px] min-h-[44px]';

export function Button({
  variant = 'primary',
  href,
  children,
  ...props
}: {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const className = `${base} ${variants[variant]}`;

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
