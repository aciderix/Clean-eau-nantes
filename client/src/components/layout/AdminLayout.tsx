import { ReactNode, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAdmin } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileEdit, 
  LogOut, 
  UserCog, 
  MessageSquare,
  Loader 
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const { isAuthenticated, isAdmin, logout, isLoading } = useAdmin();
  const [location, navigate] = useLocation();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated && location !== '/admin/login') {
      navigate('/admin/login');
    }
  }, [isAuthenticated, isLoading, location, navigate]);

  // Redirect to home if authenticated but not admin
  useEffect(() => {
    if (!isLoading && isAuthenticated && !isAdmin && location !== '/admin/login') {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, isLoading, location, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-primary">C.L.E.A.N. Admin</h2>
        </div>
        <nav className="p-4 space-y-2">
          <Link href="/admin">
            <a className={`flex items-center p-3 rounded-lg ${location === '/admin' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>
              <LayoutDashboard className="mr-2 h-5 w-5" />
              <span>Tableau de bord</span>
            </a>
          </Link>
          <Link href="/admin/content">
            <a className={`flex items-center p-3 rounded-lg ${location === '/admin/content' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>
              <FileEdit className="mr-2 h-5 w-5" />
              <span>Gérer le contenu</span>
            </a>
          </Link>
          <Link href="/admin/users">
            <a className={`flex items-center p-3 rounded-lg ${location === '/admin/users' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>
              <UserCog className="mr-2 h-5 w-5" />
              <span>Utilisateurs</span>
            </a>
          </Link>
          <Link href="/admin/messages">
            <a className={`flex items-center p-3 rounded-lg ${location === '/admin/messages' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}>
              <MessageSquare className="mr-2 h-5 w-5" />
              <span>Messages</span>
            </a>
          </Link>
        </nav>
        <div className="p-4 mt-auto border-t">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center" 
            onClick={async () => {
              await logout();
              navigate('/');
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Déconnexion</span>
          </Button>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <div className="flex items-center space-x-4">
            <Link href="/" target="_blank">
              <a className="text-primary hover:underline">
                Voir le site
              </a>
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
