import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import _ from 'lodash';
import {Card} from '../atoms/Card';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SCREEN_WIDTH = Dimensions.get('window').width;
export default class SelectLevelCarousel extends React.Component {
  constructor(props) {
    super(props);
    
  }
  handleClick = (item) => {
    const {navigation} = this.props;

    if (item) navigation.navigate('QuizScreen', {data: item});
  };

  _moveToNext = () => {
    this._carousel.snapToNext();
  };

  _moveToPrev = () => {
    this._carousel.snapToPrev();
  };

  _renderItem = ({item, index}) => {
    return (
      <Card style={styles.cardContainerStyle}>
        <TouchableOpacity
          style={styles.snapBtn}
          onPress={() => this.handleClick(item)}>
          <ImageBackground
            source={{uri: item.url}}
            style={styles.imageBackgroundStyle}></ImageBackground>
        </TouchableOpacity>
      </Card>
    );
  };

  render() {
    
    if (!this.props.items.image) return null;
    return (
      <View style={styles.container}>
        <ImageBackground
            source={{uri: this.props.backgroundImage}}
            style={{width:'100%',}}
            >
          <View style={{backgroundColor:'rgba(0,0,0, 0.7)'}}>
            <View style={styles.titleBar}>
            <Text style={styles.title}>{this.props.items.title}</Text>
              <Text style={styles.content}>{this.props.items.content}</Text>
            </View>
            <View style={styles.slider}>
              <Carousel
                key={'items'}
                ref={(c) => {
                  this._carousel = c;
                }}
                data={this.props.items.image}
                renderItem={this._renderItem}
                sliderWidth={SCREEN_WIDTH}
                itemWidth={SCREEN_WIDTH / 2}
                loop={true}
                activeSlideAlignment="start"
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                nestedScrollEnabled={true}
                removeClippedSubviews={true}
              />
              <View style={styles.snapBtnBox}>
                <TouchableOpacity style={styles.snapBtn} onPress={this._moveToPrev}>
                  <Icon
                    name="angle-left"
                    size={40}
                    color={'rgba(255, 255, 255, 0.75)'}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.snapBtn} onPress={this._moveToNext}>
                  <Icon
                    name="angle-right"
                    size={40}
                    color={'rgba(255, 255, 255, 0.75)'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    
  },
  titleBar: {
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    fontSize: 20,
    color: 'rgba(255,255,255,1)',
    textAlign:'center',
  },
  title: {
    fontSize: 70,
    color: 'rgba(255,255,255,1)',
    textAlign:'center',
  },
  label: {},
  slideItem: {
    width: SCREEN_WIDTH / 3,
    padding: 3,
    alignItems: 'center',
  },

  slider: {
    justifyContent: 'center',
    
    backgroundColor: '#222',
    padding: 10,
  },
  snapBtnBox: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  snapBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainerStyle: {
    borderRadius: 8,
    overflow: 'hidden',
    width: SCREEN_WIDTH / 2.5,
    padding: 3,
    alignItems: 'center',
  },
  imageBackgroundStyle: {
    width: SCREEN_WIDTH / 2.5,
    height: 180,
    justifyContent: 'center',
    alignItems:'center'
  },
});
