// A mock function to mimic making an async request for data
export function fetchCatFacts() {
  return new Promise<{ data: string[] }>((resolve) =>
    setTimeout(() => resolve({ data: ['test fact 1', 'test fact 2'] }), 500)
  );
}
