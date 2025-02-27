import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; 

const SkeletonItem: React.FC = () => {
  return (
    <div style={{ display: "flex", padding: "10px", borderBottom: "1px solid #ddd" }}>
      <Skeleton height={150} width={100} />
      <div style={{ marginLeft: "10px", flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
        <Skeleton height={20} width="80%" />
        <Skeleton height={15} width="60%" />
      </div>
    </div>
  );
};

export default SkeletonItem;
