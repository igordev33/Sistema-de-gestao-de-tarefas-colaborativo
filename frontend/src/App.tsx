import ListSystem from "./components/ListSystem";
import LoginSystem from "./components/LoginSystem";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import "./layout.css"

function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginSystem />;
  }

  return (
    <ListSystem />
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}