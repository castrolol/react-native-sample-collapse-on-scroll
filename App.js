import React, { useState, useRef } from 'react';
import { View, Dimensions, Animated, TouchableOpacity } from 'react-native';


const { width, height } = Dimensions.get("screen");

function App() {

  const scrollRef = useRef(null);
  const [scrollY] = useState(new Animated.Value(0));

  const heightAnim = scrollY.interpolate({
    inputRange: [0, 320],
    outputRange: [400, 80],
    extrapolate: 'clamp'

  })

  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>

      <Animated.ScrollView
        // usei o ref para forçar o scroll top
        ref={scrollRef}
        // Não usei nativeDriver, pq o height não anima com native driver...
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } }, },],
          { useNativeDriver: false, }
        )}

      >
        <View style={{
          justifyContent: 'center',
          height: 60,
          flexDirection: 'row',
          flexBasis: 60
        }}>
        </View>
        {/* 
          esse eh o "espaço vago" atras do card, 
          ja q vamos posicionar ele via absolute 
        */}
        <View style={{ height: 400 }}>
        </View>



        {/* 
          aqui seria o conteudo... eh interessante ele ter como scrollar, 
          mesmo q o conteudo for menor q o scroll todo para o collapse
        */}
        <View style={{ height: height + 200 }}>
        </View>

      </Animated.ScrollView>

      { /* 
        o card eu botei depois do scroll, pra ele nao sofrer influencia 2x,
        talvez tenha uma forma melhor de fazer isso...
       */}
      <Animated.View style={{
        // o absolute aqui, eh pra botar encima do conteudo
        position: 'absolute',
        // o top, eh pra ele nao entrar embaixo do header
        top: 60,
        // o height, eh o tamanho animado...
        height: heightAnim,

        left: width * .1,

        // pra ficar bunito
        justifyContent: 'center', flexDirection: 'row'
      }}>

        <TouchableOpacity onPress={() => {
          scrollRef.current.scrollTo({ x: 0, y: 0, animated: true })
        }}
          style={{ backgroundColor: '#00aa99', width: width * 0.8 }}>

        </TouchableOpacity>
      </Animated.View>
    </View>
  );

}

export default App;