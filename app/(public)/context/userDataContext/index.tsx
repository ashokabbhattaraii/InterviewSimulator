import { useState } from "react";
import { createContext, useContext } from "react";

interface userDataContextType {
  state: boolean;
  setState: (value: boolean) => void;
}

const contextCreate = createContext<userDataContextType | undefined>(undefined);

export const UserDataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<boolean>(false);
  return (
    <contextCreate.Provider value={{ state, setState }}>
      {children}
    </contextCreate.Provider>
  );
};

export const useUserDataContext = () => {
  const context = useContext(contextCreate);
  if (context === undefined) {
    throw new Error(
      "useUserDataContext must be used within a UserDataContextProvider",
    );
  }
  return context;
};
