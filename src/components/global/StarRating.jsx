import React from 'react';
import { View } from 'react-native';
import { Star } from 'lucide-react-native';
import Colors from '@theme/colors';

const StarRating = ({ rating, size = 14 }) => {
  const filledStars = Math.round(rating);

  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={size}
          color={i <= filledStars ? Colors.starActive : Colors.starInactive}
          fill={i <= filledStars ? Colors.starActive : 'transparent'}
        />
      ))}
    </View>
  );
};

export default StarRating;
