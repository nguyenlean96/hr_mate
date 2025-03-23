import { useRef, useState, useEffect } from 'react';
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from 'react-native-gesture-handler';
import ScrollCard from './card';

export default function JobsList(
  {
    jobs_list,
    handlePressLike,
    liked,
  }: {
    jobs_list: any[];
    handlePressLike: (
      jobId: number,
      cb?: () => void
    ) => void;
    liked: Set<number>;
  }) {
  const scrollRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [scrollToIndex, setScrollToIndex] = useState(0);

  const handleScrollToIndex = (index: number) => {
    if (scrollRef.current) {
      (scrollRef.current as any)
        .scrollToItem({
          item: jobs_list[index],
          animated: true,
        })
    }
  }

  const handleLike = (jobId: number) => {
    handlePressLike(jobId, () => {
      /**
       *  Look for the index in the jobs_list array:
       *    to cache the last interaction with the job posting
       *    which will be scrolled into view after the refresh
       *    to maintain the user's context
       */
      setScrollToIndex(
        jobs_list
          .findIndex(
            (job) => (job?.jobview?.job?.listingId === jobId)
          )
      );
    })
  }

  useEffect(() => {
    if (!refreshing) {
      handleScrollToIndex(scrollToIndex)
    }
  }, [refreshing])

  return (
    <FlashList
      ref={scrollRef}
      initialScrollIndex={scrollToIndex}
      style={{
        flex: 1,
      }}
      data={jobs_list}
      renderItem={({ item, index }: { item: any; index: number }) => (
        <ScrollCard
          item={item}
          handlePressLike={handleLike}
          wasLiked={liked.has(item?.jobview?.job?.listingId)}
        />
      )}
      keyExtractor={(item) => item?.jobview?.job?.listingId.toString()}
      extraData={liked}
      refreshing={refreshing}
      refreshControl={
        <RefreshControl refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setTimeout(() => {
              setRefreshing(false);
            },
              100
            )
          }}
        />
      }
    />
  )
}
