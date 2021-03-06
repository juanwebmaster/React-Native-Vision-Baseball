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
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SCREEN_WIDTH = Dimensions.get('window').width;
export default class CustomCarouselSplit extends React.Component {
    constructor (props) {
      super(props);
    }
    handleClick = (item) => {
      const {navigation} = this.props;
      if (item.post_id != null) navigation.navigate('SelectLevel', {data: item});
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
        <TouchableOpacity style={styles.snapBtn} onPress={()=> this.handleClick(item)}>
          <ImageBackground
            source={{uri: item.img_url}}
            style={styles.imageBackgroundStyle}>
          </ImageBackground>
        </TouchableOpacity>
      </Card>
    );
  };
  
  render() {
    if (!this.props.items.length) return null;
    return (
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <View style={styles.slider}>
          <Carousel
            key={'items'}
            ref={(c) => {
              this._carousel = c;
            }}
            data={this.props.items}
            renderItem={this._renderItem}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH}
            loop={true}
            activeSlideAlignment="start"
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            nestedScrollEnabled={true}
            removeClippedSubviews={true}
          />
          <View style={styles.snapBtnBox}>
            <TouchableOpacity style={styles.snapBtn} onPress={this._moveToPrev}>
              <Icon name="angle-left" size={40} color={'rgba(255, 255, 255, 0.75)'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.snapBtn} onPress={this._moveToNext}>
              <Icon name="angle-right" size={40} color={'rgba(255, 255, 255, 0.75)'}  />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 30,
    marginBottom: 30
  },
  titleBar: {
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    color: '#ffffff',
  },
  label: {},
  slideItem: {
    width: SCREEN_WIDTH / 3,
    padding: 3,
    alignItems: 'center',
  },
  
  catName: {
    textAlign: 'center',
  },
  slider: {
    justifyContent: 'center',
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
    width: SCREEN_WIDTH * 0.9,
    padding: 3,
    alignItems: 'center',
  },
  imageBackgroundStyle: {
    width: SCREEN_WIDTH * 0.9,
    height: 200,
    justifyContent: 'center',
  },
});
