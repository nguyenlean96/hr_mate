import { useRef, useState, useReducer, useEffect } from 'react';
import {
  View,
} from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { job_posting_examples } from '@/constants/job_posting_example';
import { RefreshControl } from 'react-native-gesture-handler';
import ScrollCard from '@/components/ui/jobs/scroll/card';

function handleLike(
  state: Set<number>,
  action: { type: 'like' | 'unlike', payload: number }
): Set<number> {
  switch (action.type) {
    case 'like':
      state.add(action.payload);
      return new Set(state);
    case 'unlike':
      state.delete(action.payload);
      return new Set(state);
    default:
      return state;
  }
}

export default function Home() {
  const scrollRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [scrollToIndex, setScrollToIndex] = useState(0);

  const [liked, setLiked] = useReducer(
    handleLike,
    new Set<number>()
  )

  function handlePressLike(jobId: number) {
    if (liked.has(jobId)) {
      setLiked({ type: 'unlike', payload: jobId });
    } else {
      setLiked({ type: 'like', payload: jobId });
      
      /**
       *  Look for the index in the job_posting_examples array:
       *    to cache the last interaction with the job posting
       *    which will be scrolled into view after the refresh
       *    to maintain the user's context
       */
      setScrollToIndex(job_posting_examples.findIndex((job) => job?.jobview?.job?.listingId === jobId));
    }
  }

  const handleScrollToIndex = (index: number) => {
    if (scrollRef.current) {
      (scrollRef.current as any)
        .scrollToItem({
          item: job_posting_examples[index],
          animated: true,
        })
    }
  }

  useEffect(() => {
    if (!refreshing) {
      handleScrollToIndex(scrollToIndex)
    }
  }, [refreshing])

  return (
    <View style={{
      flex: 1,
    }}>
      <FlashList
        ref={scrollRef}
        initialScrollIndex={scrollToIndex}
        style={{
          flex: 1,
        }}
        data={refreshing ? [] : job_posting_examples}
        renderItem={({ item, index }) => (
          <ScrollCard
            item={item}
            handlePressLike={handlePressLike}
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
    </View>
  )
}
