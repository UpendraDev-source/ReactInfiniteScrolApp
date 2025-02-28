import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchBooks, resetBooks } from "../redux/booksSlice";
import { List, AutoSizer, InfiniteLoader } from "react-virtualized";
import SkeletonItem from "./SkeletonItem";
import BookItem from "./BookItem";

const InfiniteScrollList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { books, loading, hasMore, page } = useSelector((state: RootState) => state.books);

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current && !loading) {
      dispatch(resetBooks());
      dispatch(fetchBooks());
      isFirstLoad.current = false; 
    }
  }, [dispatch, loading]);

  const loadMoreRows = useCallback(
    async ({ stopIndex }: { startIndex: number; stopIndex: number }) => {  
      const buffer = 3; 
      
      if (hasMore && !loading && stopIndex >= books.length - buffer) {
        await dispatch(fetchBooks()).unwrap(); 
      }
    },
    [dispatch, loading, hasMore, books.length, page]
  );
  
  
    const isRowLoaded = ({ index }: { index: number }) => {
    return !!books[index];
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
                  <div key={key} style={style}>
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
