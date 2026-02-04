import { createContext, useContext, useState, ReactNode } from "react";

interface ValidateContextType {
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
  isResultSubmitted: boolean;
  setIsResultSubmitted: (value: boolean) => void;
  correctCount: number;
  setCorrectCount: (value: number) => void;
  inncorrectCount: number;
  setInncorrectCount: (value: number) => void;
  difficultyLevel: string;
  isDifficultySelected: boolean;
  setIsDifficultySelected: (value: boolean) => void;
  setDifficultyLevel: (level: string) => void;
  lastAttempt: resultType | null;
  setLastAttempt: (attempt: resultType | null) => void;
  resetCounts: () => void;
}

interface resultType {
  userId: string;
  mockType: string;
  totalAttempt: number;
  totalCorrect: number;
  isResultSubmitted: boolean;
  setIsResultSubmitted: (value: boolean) => void;

  totalIncorrect: number;
  result: number;
}

const ValidateContext = createContext<ValidateContextType | undefined>(
  undefined,
);

interface ContextProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isResultSubmitted, setIsResultSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [inncorrectCount, setInncorrectCount] = useState(0);
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [isDifficultySelected, setIsDifficultySelected] = useState(false);
  const [lastAttempt, setLastAttempt] = useState<resultType | null>(null);

  const resetCounts = () => {
    setCorrectCount(0);
    setInncorrectCount(0);
    setIsSubmitted(false);
    setSelectedOption("");
  };

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
        lastAttempt,
        setLastAttempt,
        resetCounts,

        isResultSubmitted,
        setIsResultSubmitted,
      }}
    >
      {children}
    </ValidateContext.Provider>
  );
};

export const useValidateContext = () => {
  const context = useContext(ValidateContext);
  if (!context) {
    throw new Error("useValidateContext must be used within a ContextProvider");
  }
  return context;
};
