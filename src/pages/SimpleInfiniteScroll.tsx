import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

interface Book {
  key: string;
  title: string;
  author_name?: string[];
}

const SimpleInfiniteScroll: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const listRef = useRef<HTMLDivElement | null>(null);
  const isFirstLoad = useRef(true); // Prevents duplicate first fetches

  const fetchBooks = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=react&page=${page}`);
      const newBooks = response.data.docs;

      if (newBooks.length === 0) {
        setHasMore(false);
      } else {
        setBooks((prev) => [...prev, ...newBooks]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  // ✅ Prevent first-time double fetch
  useEffect(() => {
    if (isFirstLoad.current) {
      fetchBooks();
      isFirstLoad.current = false;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (listRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 50 && !loading) {
          fetchBooks();
        }
      }
    };

    const scrollContainer = listRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "center" }}>
      <h2>Simple Infinite Scroll</h2>
      <div 
        ref={listRef} 
        style={{ width: "80%", height: "80%", overflowY: "auto", border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}
      >
        {books.map((book, index) => (
          <div 
            key={`${book.key}-${index}`} 
            style={{ padding: "10px", color: "#666", borderBottom: "1px solid #ddd", backgroundColor: "#f9f9f9", marginBottom: "5px" }}
            onClick={() => book && alert(`Selected Book: ${book.title}`)} 
          >
            <h4>{book.title}</h4>
            <p style={{ fontSize: "14px", color: "#666" }}>
              {book.author_name ? book.author_name : "Unknown Author"}
            </p>
          </div>
        ))}
        {loading && <p>Loading more books...</p>}
        {!hasMore && <p>No more books to load.</p>}
      </div>
    </div>
  );
};

export default SimpleInfiniteScroll;
