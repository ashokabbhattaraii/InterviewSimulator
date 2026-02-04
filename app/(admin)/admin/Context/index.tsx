"use client";

import React, { useContext, createContext, useState } from "react";

interface contextType {
  formClose: boolean;
  setFormClose: (value: boolean) => void;
  isAddUserFormOpen: boolean;
  setIsAddUserFormOpen: (value: boolean) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  editUserId: string;
  setEditUserId: (value: string) => void;
}

const FormContext = createContext<contextType | null>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formClose, setFormClose] = useState(false);
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState("");
  return (
    <FormContext.Provider
      value={{
        formClose,
        setFormClose,
        isAddUserFormOpen,
        setIsAddUserFormOpen,
        isEditing,
        setIsEditing,
        editUserId,
        setEditUserId,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === null) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}
