type CardVariant = 'default' | 'stat' | 'elevated';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'rounded-2xl border border-border bg-surface-raised p-7',
  stat: 'rounded-xl border border-border bg-surface-raised p-5',
  elevated:
    'rounded-2xl border border-border bg-surface-raised p-7 shadow-lg shadow-black/5 dark:shadow-black/20',
};

export default function Card({ variant = 'default', className = '', children, ...props }: CardProps) {
  return (
    <div className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}
