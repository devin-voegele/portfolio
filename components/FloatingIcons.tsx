'use client';

import { Code2, Shield } from 'lucide-react';

export default function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Static subtle icons - no animation for better performance */}
      <div className="absolute top-20 left-10 text-white/[0.03]">
        <Code2 className="w-16 h-16" />
      </div>
      <div className="absolute bottom-32 right-20 text-white/[0.03]">
        <Shield className="w-12 h-12" />
      </div>
    </div>
  );
}
