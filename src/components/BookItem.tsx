import React from "react";
import defaultCover from "../assets/default-book-cover.jpg"; 

interface BookProps {
  title: string;
  author?: string[];
}

const BookItem: React.FC<BookProps> = ({ title, author }) => {
  return (
    <div style={{ padding: "20px", borderBottom: "1px solid #ddd", display: "flex", gap: "15px", alignItems: "center", backgroundColor: "#7dbd9b" }}>
      <img 
        src={defaultCover} 
        alt="Book Cover" 
        style={{ width: "60px", height: "90px", objectFit: "cover", borderRadius: "5px" }}
      />
      <div>
        <h4 style={{ marginBottom: "8px" }}>{title?.slice(0, 30) || "Untitled"}</h4>
        <p style={{ fontSize: "14px", color: "#555" }}>
          {author?.join(", ").slice(0, 30) || "Unknown Author"}
        </p> 
      </div>
    </div>
  );
};

export default BookItem;
