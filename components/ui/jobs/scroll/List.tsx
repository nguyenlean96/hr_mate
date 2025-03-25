import React, { useRef, useState, useEffect } from 'react';
import { FlashList } from "@shopify/flash-list";
import { RefreshControl } from 'react-native-gesture-handler';
import ScrollCard from './ScrollCard';
import { useAppData } from '@/contexts/app_data';


const JobsList: React.FC = () => {
  const scrollRef = useRef(null);
  const { data: jobs_data, liked, handlePressLike } = useAppData();
  const [refreshing, setRefreshing] = useState(false);
  const [scrollToIndex, setScrollToIndex] = useState(0);

  const handleScrollToIndex = (index: number) => {
    if (scrollRef.current && jobs_data) {
      (scrollRef.current as any)
        .scrollToItem({
          item: jobs_data[index],
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
    <FlashList
      ref={scrollRef}
      initialScrollIndex={scrollToIndex}
      style={{
        flex: 1,
      }}
      data={
        Object.values(jobs_data)
      }
      renderItem={({ item, index }: { item: any; index: number }) => (
        <ScrollCard
          item={item}
          wasLiked={liked.has(item?.jobview?.job?.listingId)}
        />
      )}
      keyExtractor={(item: any) => item?.jobview?.job?.listingId.toString()}
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

export default JobsList;