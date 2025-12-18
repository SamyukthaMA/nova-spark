import { ReactNode, useState } from "react";
import { Menu } from "lucide-react";

interface LayoutProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  children: ReactNode;
}

export default function Layout({
  currentView,
  setCurrentView,
  children,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full h-screen flex overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-50
          h-full w-64
          bg-zinc-900 border-r border-zinc-800
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Your existing sidebar content */}
        <div className="h-full overflow-y-auto">
          {/* Example nav — keep your real one */}
          {/* Use currentView & setCurrentView here */}
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="md:hidden flex items-center gap-3 p-3 border-b border-zinc-800 bg-black">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded bg-zinc-800"
          >
            <Menu size={20} />
          </button>
          <span className="font-semibold">Nova Spark</span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

