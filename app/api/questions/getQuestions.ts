export async function getQuestions() {
  const res = await fetch("/dashboard/fetch");
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}
