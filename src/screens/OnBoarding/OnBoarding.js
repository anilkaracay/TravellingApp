import React from 'react';
import {StyleSheet, Text, View, Image, Animated, TouchableOpacity} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
//Constants
import * as theme from "../../constants/theme";
import * as Images from '../../constants/images'

//Theme
const {COLORS, FONTS, SIZES} = theme;

//Dummy Data
const onBoardings = [
  {
    title: "Let's Travelling",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: Images.onboarding1
  },
  {
    title: "Navigation",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: Images.onboarding2
  },
  {
    title: "Destination",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: Images.onboarding3
  }
];
const OnBoarding = () => {
  const [completed, setCompleted] = React.useState(false);
  const scrollX = new Animated.Value(0);
  React.useEffect(() => {
    scrollX.addListener(({ value }) => {
      if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
        setCompleted(true);
      }
    });

    return () => scrollX.removeListener();
  }, []);

//Render
  const renderContent = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationrate={0}
        scrollEventThrottle={16}
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          {
            nativeEvent: {contentOffset: {x: scrollX}}
          }
        ], {useNativeDriver: false})}
      >
        {onBoardings.map((item, index) => (
          <View
            key={index}
            style={{width: SIZES.width}}

          >
            {/* Image*/}
            <View>
              <Image
                source={item.img}
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: '100%'
                }}
              />

            </View>
            <View style={{position: 'absolute', bottom: '10%', left: 40, right: 40}}>
              <Text style={{...FONTS.h1, color: COLORS.gray, textAlign: 'center'}}>{item.title}</Text>
              <Text style={{
                ...FONTS.body3,
                textAlign: 'center',
                marginTop: SIZES.base,
                color: COLORS.gray
              }}>{item.description}</Text>
            </View>
            <TouchableOpacity style={{
              backgroundColor: COLORS.blue,
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 150,
              height: 60,
              justifyContent: 'center',
              borderTopLeftRadius: 30,
              borderBottomLeftRadius: 30,
              paddingLeft: 20
            }} onPress={() => console.log('basıldı')}>
              <Text style={{...FONTS.h1, color: COLORS.white}}>{completed ? "Let's Go" : "Skip"}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
    )
  }
  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width)
    return (
      <View style={styles.dotContainer}>
        {onBoardings.map((item, index) => {
          const opacity = dotPosition.interpolate(
            {
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp'
            }
          )
          const dotSize = dotPosition.interpolate(
            {
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base, 17, SIZES.base],
              extrapolate: 'clamp'
            }
          )
          return (
            <Animated.View style={[styles.dot, {width: dotSize, height: dotSize}]}
                           key={`dot-${index}`}
                           opacity={opacity}
            >
            </Animated.View>
          )
        })}
      </View>
    )

  }


  return (
    <SafeAreaView style={styles.container}>
      <View>
        {renderContent()}
      </View>
      <View style={styles.dotRootsContainer}>
        {renderDots()}

      </View>

    </SafeAreaView>
  )

}
export default OnBoarding
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  dotContainer: {
    flexDirection: 'row',
    height: SIZES.padding

  },
  dotRootsContainer: {
    position: 'absolute',
    bottom: SIZES.height > 700 ? '25%' : '20%',
    justifyContent: 'center',
    alignItems: 'center',

  },
  dot: {
    backgroundColor: COLORS.blue,
    borderRadius: SIZES.radius,
    marginHorizontal: SIZES.radius / 2

  },

});
