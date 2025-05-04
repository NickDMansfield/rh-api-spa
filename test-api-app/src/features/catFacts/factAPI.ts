export async function fetchCatFacts(numToFetch: number): Promise<{ data: string[] }> {
  const response = await fetch(`https://catfact.ninja/facts?limit=${numToFetch}&max_length=140`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json();
  const facts = json.data.map((fact: any) => fact.fact);

  return { data: facts };
}
