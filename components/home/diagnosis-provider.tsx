"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Diagnosis = { goal: string; setGoal: (goal: string) => void };
const DiagnosisContext = createContext<Diagnosis | null>(null);

export function DiagnosisProvider({ children }: { children: ReactNode }) {
  const [goal, setGoal] = useState("");
  return (
    <DiagnosisContext.Provider value={{ goal, setGoal }}>
      {children}
    </DiagnosisContext.Provider>
  );
}

export function useDiagnosis() {
  const diagnosis = useContext(DiagnosisContext);
  if (!diagnosis) throw new Error("DiagnosisProvider ausente");
  return diagnosis;
}
