import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList} from 'react-native';
import SlideItem from './SlideItem';

const Slider = ({imagesWithTitleAndText, titleFlex, textFlex, buttonFlex, handleButtonPress, timer, buttonText}) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % imagesWithTitleAndText.length; // Calculate next index, looping back to 0
      setCurrentIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }, timer); // Adjust interval as needed

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  
  return (
    <>
    <View style={styles.container}>
        <FlatList data={imagesWithTitleAndText}
        renderItem= {({item}) => <SlideItem item={item} titleFlex={titleFlex} textFlex={textFlex} buttonFlex={buttonFlex} handleButtonPress={handleButtonPress} buttonText={buttonText}/> } 
        horizontal
        ref={flatListRef}
        pagingEnabled
        snapToAlignment='center'
        keyExtractor={(item, index) => index.toString()}
        decelerationRate={0.7}
        />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});

export default Slider;


