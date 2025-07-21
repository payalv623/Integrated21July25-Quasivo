import * as React from 'react';
import { cn } from '../../../lib/utils';

interface CyberpunkTileProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  status?: string;
  icon?: React.ReactNode;
}

export const CyberpunkTile = React.forwardRef<HTMLDivElement, CyberpunkTileProps>(
  ({ title, description, status = 'Active', icon, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        `rounded-[10px] p-10 bg-gradient-to-br from-[#08343c] to-black shadow-[0_0_32px_4px_rgba(0,255,255,0.25)] border border-cyan-400/30
        transition-transform transition-shadow duration-300
        hover:scale-110 hover:shadow-[0_0_48px_8px_rgba(0,255,255,0.45)]
        group cursor-pointer select-none text-[1.6rem]`,
        className
      )}
      style={{ fontSize: '1.6rem', ...props.style }}
      {...props}
    >
      <div className="flex items-center mb-6 space-x-6">
        {icon && <span className="text-cyan-400 text-4xl drop-shadow-[0_0_12px_cyan]">{icon}</span>}
        <h3 className="text-cyan-300 text-3xl font-bold tracking-wide neon-text drop-shadow-[0_0_12px_cyan]">
          {title}
        </h3>
        <span className="flex items-center ml-auto">
          <span className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-[0_0_16px_4px_#39ff14] mr-4" />
          <span className="text-green-400 text-lg font-semibold drop-shadow-[0_0_8px_#39ff14]">{status}</span>
        </span>
      </div>
      <div className="text-cyan-200 text-xl font-medium mb-4 drop-shadow-[0_0_8px_cyan]">
        {description}
      </div>
      {props.children}
    </div>
  )
);

CyberpunkTile.displayName = 'CyberpunkTile';

export default CyberpunkTile; 