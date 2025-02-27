import { Provider } from "react-redux";
import store from "../redux/store";
import InfiniteScrollList from "../components/InfiniteScrollList";

const VirtualizedInfiniteScroll = () => {
  return (
    <Provider store={store}>
      <div style={{ height:"100vh", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#b8d5cc" }}>
        <div style={{ height: "15vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "bold", color: "#333", width: "100%" }}>
        Virtualized Infinite Scroll
        </div>

        <div style={{ flex: 1, width: "400px", backgroundColor: "#fff", padding: "5px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}>
          <InfiniteScrollList />
        </div>
      </div>
    </Provider>
  );
};

export default VirtualizedInfiniteScroll;
