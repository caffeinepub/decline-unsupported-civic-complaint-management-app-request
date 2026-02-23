import { AlertCircle, Smartphone, Globe, ArrowRight, Heart, Download } from 'lucide-react';
import { SiReact, SiTypescript } from 'react-icons/si';
import { useState, useEffect } from 'react';

export default function App() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'civic-platform-pwa'
  );

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA installation accepted');
    }
    
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-border/40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Civic Platform</h1>
                <p className="text-xs text-muted-foreground">Progressive Web App</p>
              </div>
            </div>
            
            {isInstallable && (
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Install App
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
        {/* PWA Success Banner */}
        <div className="mb-8 p-6 rounded-2xl border-2 border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-950/20">
          <div className="flex gap-4">
            <Globe className="w-6 h-6 text-green-600 dark:text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                ✅ Progressive Web App Enabled
              </h2>
              <p className="text-green-800 dark:text-green-200 leading-relaxed">
                This application is now a fully functional PWA! You can install it on your device for an app-like experience, offline support, and faster loading times.
              </p>
            </div>
          </div>
        </div>

        {/* PWA Features */}
        <section className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-900/50">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">PWA Features</h3>
              <p className="text-muted-foreground">App-like experience without app store distribution</p>
            </div>
          </div>
          
          <div className="space-y-3 ml-16">
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-foreground"><strong>Installable</strong> - Add to home screen on mobile and desktop</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-foreground"><strong>Offline Support</strong> - Works without internet connection</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-foreground"><strong>Fast Loading</strong> - Cached assets for instant startup</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-foreground"><strong>Responsive Design</strong> - Optimized for all screen sizes</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-foreground"><strong>Standalone Mode</strong> - Runs in its own window</span>
            </div>
          </div>
        </section>

        {/* Original Alert Banner */}
        <div className="mb-8 p-6 rounded-2xl border-2 border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/20">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                Platform Capabilities
              </h2>
              <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                While native mobile apps require app stores and external services, PWAs offer a powerful alternative that works across all platforms through web browsers.
              </p>
            </div>
          </div>
        </div>

        {/* What We Build */}
        <section className="mb-12 p-8 rounded-2xl bg-white dark:bg-gray-800 border border-border shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Technology Stack</h3>
              <p className="text-muted-foreground">Built on the Internet Computer with modern web technologies</p>
            </div>
          </div>
          
          <div className="space-y-3 ml-16">
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <div className="flex items-center gap-2">
                <SiReact className="w-4 h-4 text-blue-500" />
                <span className="text-foreground"><strong>React + TypeScript</strong> - Modern, type-safe frontend</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-foreground"><strong>Progressive Web App</strong> - Installable, offline-capable</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-foreground"><strong>Service Worker</strong> - Smart caching and offline support</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-foreground"><strong>Motoko Backend</strong> - Internet Computer smart contracts</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-foreground"><strong>Internet Identity</strong> - Decentralized authentication</span>
            </div>
          </div>
        </section>

        {/* How to Install */}
        <section className="mb-12 p-8 rounded-2xl bg-white dark:bg-gray-800 border border-border shadow-sm">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
            <Download className="w-6 h-6 text-blue-600" />
            How to Install This PWA
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">📱 On Mobile (iOS/Android)</h4>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>Open this page in Safari (iOS) or Chrome (Android)</li>
                <li>Tap the Share button or menu (⋮)</li>
                <li>Select "Add to Home Screen"</li>
                <li>Confirm and the app icon will appear on your home screen</li>
              </ol>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">💻 On Desktop (Chrome/Edge)</h4>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>Look for the install icon in the address bar</li>
                <li>Click "Install" or use the button above</li>
                <li>The app will open in its own window</li>
                <li>Access it from your applications menu</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="p-8 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Build Your Civic Platform?</h3>
          <p className="mb-6 text-blue-50 leading-relaxed">
            This PWA foundation is ready for your civic complaint management features. Citizens and workers can install it on their devices and use it like a native app, with offline support and fast performance.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://internetcomputer.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              Learn About Internet Computer
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://web.dev/progressive-web-apps/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors border border-blue-500"
            >
              Learn About PWAs
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Civic Platform. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
