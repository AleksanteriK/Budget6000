import { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  salary: number;
  housingAllowance: number;
  studyAllowance: number;
  studyAllowanceMonths: number;
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
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

  const isLoggedIn = !!token;

  const refreshUser = async () => {
    if (!token) return;
    try {
      const response = await fetch("https://budgetapi.tonitu.dev/api/user/myinformation", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Failed to fetch user");
  
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      console.error("Failed to refresh user", err);
      setUser(null);
      setToken(null);
    }
  };

  useEffect(() => {
    if(!token) {
      localStorage.removeItem("token");
      setUser(null);
      setLoadingUser(false);
      return;
    }

    localStorage.setItem("token", token);
    setLoadingUser(true);
    
    refreshUser().finally(() => setLoadingUser(false));
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, isLoggedIn, user, loadingUser, refreshUser }}>
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