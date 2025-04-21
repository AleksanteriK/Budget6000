import { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  salary: number;
  housingAllowance: number;
  studyAllowance: number;
  otherIncome: number[];
  rent: number;
  mortage: number;
  electricityBill: number;
  food: number;
  otherExpenses: number[];
  email: string;
  phone: string;
};

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  isLoggedIn: boolean;
  user: User | null;
  loadingUser: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  const isLoggedIn = !!token;

  useEffect(() => {
    if(!token) {
      localStorage.removeItem("token");
      setUser(null);
      setLoadingUser(false);
      return;
    }

    localStorage.setItem("token", token);
    setLoadingUser(true);
    fetch('https://budgetapi.tonitu.dev/api/user/myinformation', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (res) => {
      if (!res.ok) throw new Error('Failed to fetch user');
      const data = await res.json();
      setUser(data);
    })
    .catch(() => setUser(null))
    .finally(() => setLoadingUser(false));
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, isLoggedIn, user, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};