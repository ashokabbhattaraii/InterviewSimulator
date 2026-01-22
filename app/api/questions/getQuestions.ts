export async function getQuestions(difficulty: string) {
  const res = await fetch(
    `/api/question?difficulty=${difficulty.toUpperCase()}`,
    {
      method: "GET",
    },
  );
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch questions");
  }
  return res.json();
}
