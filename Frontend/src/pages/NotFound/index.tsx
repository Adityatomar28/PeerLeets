import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background-base text-text-primary flex flex-col items-center justify-center p-6 relative">
      <div className="grid-bg-overlay" />
      <div className="glow-spot-1" />

      <div className="relative z-10 text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-8">
          <HelpCircle className="w-8 h-8 text-indigo-400" />
        </div>

        <h1 className="font-display font-black text-6xl text-white mb-4">404</h1>
        <h2 className="font-display font-bold text-xl text-white mb-3">Page Not Found</h2>
        
        <p className="font-sans text-sm text-text-secondary mb-8 leading-relaxed">
          The page you are looking for doesn't exist, has been moved, or you don't have access to join this group room.
        </p>

        <Link to="/">
          <Button className="w-full flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
