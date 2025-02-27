export interface Book {
  key: string;
  title: string;
  author_name?: string[];
}

export interface APIResponse {
  docs: Book[];
}

export const fetchBooksAPI = async (pageParam: number): Promise<APIResponse> => {
  const response = await fetch(`https://openlibrary.org/search.json?q=react&page=${pageParam}`);
  return response.json();
};
