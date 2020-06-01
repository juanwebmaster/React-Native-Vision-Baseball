import React, {useState, useEffect} from 'react';
import {get_carousel_data} from '../../apis';
import CustomCarouselSplit from '_organisms/CustomCarouselSplit';

const RecognitionTrain = ({navigation}) => {
  const [recognitionTrain, setRecognitionTrain] = useState(0);
  useEffect(() => {
    async function get_rTrain() {
      const rTrain = await get_carousel_data(2645);
      setRecognitionTrain(rTrain);
    }
    get_rTrain();
  }, []);

  return (
    <CustomCarouselSplit
      items={recognitionTrain}
      title="Spin, Speed Recognition Training >>>"
      navigation={navigation}
    />
  );
};

export default RecognitionTrain;
