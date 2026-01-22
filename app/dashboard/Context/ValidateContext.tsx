import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context
interface ValidateContextType {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
  correctCount: number;
  setCorrectCount: (value: number) => void;
  inncorrectCount: number;
  setInncorrectCount: (value: number) => void;
  difficultyLevel: string;
  isDifficultySelected: boolean;
  setIsDifficultySelected: (value: boolean) => void;
  setDifficultyLevel: (level: string) => void;
}

// Create the context
const ValidateContext = createContext<ValidateContextType | undefined>(
  undefined,
);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [inncorrectCount, setInncorrectCount] = useState(0);
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [isDifficultySelected, setIsDifficultySelected] = useState(false);

  return (
    <ValidateContext.Provider
      value={{
        selectedOption,
        setSelectedOption,
        isSubmitted,
        setIsSubmitted,
        correctCount,
        setCorrectCount,
        inncorrectCount,
        setInncorrectCount,
        difficultyLevel,
        setDifficultyLevel,
        isDifficultySelected,
        setIsDifficultySelected,
      }}
    >
      {children}
    </ValidateContext.Provider>
  );
};

// Custom hook for easier use
export const useValidateContext = () => {
  const context = useContext(ValidateContext);
  if (!context) {
    throw new Error("useValidateContext must be used within a ContextProvider");
  }
  return context;
};
