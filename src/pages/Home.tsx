import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Choose Infinite Scroll Type</h1>
      <button 
        onClick={() => navigate("/simple")} 
        style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}
      >
        Simple Infinite Scroll
      </button>
      <button 
        onClick={() => navigate("/virtualized")} 
        style={{ margin: "10px", padding: "10px 20px", fontSize: "16px" }}
      >
        Virtualized Infinite Scroll
      </button>
    </div>
  );
};

export default Home;
