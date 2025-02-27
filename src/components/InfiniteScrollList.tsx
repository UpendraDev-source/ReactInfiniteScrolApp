import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchBooks ,resetBooks} from "../redux/booksSlice";
import { List, AutoSizer, InfiniteLoader } from "react-virtualized";
import SkeletonItem from "./SkeletonItem";
import BookItem from "./BookItem";

const InfiniteScrollList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, loading, hasMore, page } = useSelector((state: RootState) => state.books);

  const isFirstLoad = useRef(true);

  const logFetchBooks = (pageNum: number) => {
    console.log(`fetchBooks called for page: ${pageNum}`);
  };

  useEffect(() => {
    if (isFirstLoad.current && !loading) {
      console.log("First load triggered");
      
      dispatch(resetBooks()); 
      dispatch(fetchBooks());
      isFirstLoad.current = false; 
    }
  }, []);

  const loadMoreRows = useCallback(
    ({ startIndex, stopIndex }: { startIndex: number; stopIndex: number }) => {
      console.log(`loadMoreRows triggered: startIndex ${startIndex}, stopIndex ${stopIndex}`);
      
      if (hasMore && !loading && stopIndex >= books.length - 1) {
        console.log(`Loading more rows for page: ${page}`);
        logFetchBooks(page);
        return dispatch(fetchBooks()).unwrap(); 
      }
      return Promise.resolve(); 
    },
    [dispatch, loading, hasMore, books.length, page]
  );


 
  const isRowLoaded = ({ index }: { index: number }) => {
    console.log(`Checking if row ${index} is loaded: ${!!books[index]}`);

    return books.length === 0 ? false : !!books[index];
  };
  

  return (
    <>
    {loading && books.length === 0 && (
      <div>
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
        <SkeletonItem />
      </div>
    )}
    
    <AutoSizer>
      {({ height, width }) => (
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={books.length + (hasMore ? 1 : 0)} 
        >
          {({ onRowsRendered, registerChild }) => (
            <List
              height={height}
              width={width}
              rowCount={books.length}
              rowHeight={170}
              onRowsRendered={onRowsRendered}
              ref={registerChild}
              rowRenderer={({ index, key, style }) => {
                const book = books[index];
                return (
                  <div key={key} style={style}  onClick={() => book && alert(`Selected Book: ${book.title}`)} // Alert on click
>
                    {book ? (
                      <BookItem title={book.title} author={book.author_name} />
                    ) : (
                      <SkeletonItem />
                    )}
                  </div>
                );
              }}
            />
          )}
        </InfiniteLoader>
      )}
    </AutoSizer>
    </>
  );
};

export default InfiniteScrollList;
