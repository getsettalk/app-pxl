import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react-native';

import { getProductById } from '@service/http.service';
import { Colors, Fonts, Spacing, Radius } from '@theme';
import { goBack } from '@navigation/NavigationRef';

const { width } = Dimensions.get('window');

const ProductDetails = ({ route }) => {
  const { product } = route.params;

  const [details, setDetails] = useState(product);
  const [qty, setQty] = useState(1);
  const [index, setIndex] = useState(0);

  const sliderRef = useRef(null);

  const images =
    details.images && details.images.length > 0
      ? details.images
      : [details.thumbnail];

  useEffect(() => {
    if (!product?.id) return;

    getProductById(product.id)
      .then(res => {
        const updated = res?.data?.products?.[0];
        if (updated) {
          setDetails(prev => ({ ...prev, ...updated }));
        }
      })
      .catch(() => { });
  }, [product?.id]);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      const nextIndex = (index + 1) % images.length;
      sliderRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setIndex(nextIndex);
    }, 3000);

    return () => clearInterval(timer);
  }, [index, images.length]);

  return (
    <LinearGradient
      colors={[Colors.splashGradientStart, Colors.splashGradientEnd]}
      style={styles.container}
    >

      <StatusBar barStyle={'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <ArrowLeft size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.carouselContainer}>
        <FlatList
          ref={sliderRef}
          data={images}
          keyExtractor={(item, i) => `${item}-${i}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={e => {
            const currentIndex = Math.round(
              e.nativeEvent.contentOffset.x / width,
            );
            setIndex(currentIndex);
          }}
          renderItem={({ item }) => (
            <FastImage
              source={{ uri: item }}
              style={styles.image}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        />
      </View>

      {images.length > 1 && (
        <View style={styles.dotsRow}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === index && styles.dotActive,
              ]}
            />
          ))}
        </View>
      )}

      <View style={styles.sheet}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.topInfoRow}>
            <View style={styles.leftInfo}>
              <Text numberOfLines={2} style={styles.title}>
                {details.title}
              </Text>
              <Text style={styles.category}>{details.category}</Text>
            </View>

            <View style={styles.rightInfo}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.price}>₹ {details.price}</Text>

              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => qty > 1 && setQty(q => q - 1)}
                >
                  <Minus size={14} color={Colors.surface} />
                </TouchableOpacity>

                <Text style={styles.qtyText}>{qty}</Text>

                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQty(q => q + 1)}
                >
                  <Plus size={14} color={Colors.surface} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{details.description}</Text>
        </ScrollView>

        <View style={styles.buyRow}>
          <View style={styles.bag}>
            <ShoppingBag size={20} color={Colors.iconActivePrimary} />
          </View>

          <TouchableOpacity style={styles.buyBtn}>
            <Text style={styles.buyText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingTop: 45,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },

  carouselContainer: {
    height: 250,
    overflow: 'hidden',
  },

  image: {
    width,
    height: 245,
  },

  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },

  dotActive: {
    backgroundColor: Colors.iconActivePrimary,
  },

  sheet: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.lg,
  },

  topInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },

  leftInfo: {
    flex: 1,
    paddingRight: Spacing.md,
  },

  rightInfo: {
    alignItems: 'flex-end',
  },

  title: {
    fontFamily: Fonts.semiBold,
    fontSize: 20,
    color: Colors.textPrimary,
  },

  category: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },

  priceLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.textSecondary,
  },

  price: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: Radius.sm,
    backgroundColor: Colors.iconActivePrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyText: {
    marginHorizontal: Spacing.sm,
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.textPrimary,
  },

  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },

  description: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },

  buyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.md,
  },

  bag: {
    width: 48,
    height: 48,
    borderRadius: Radius.round,
    backgroundColor: '#E6EBC7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },

  buyBtn: {
    flex: 1,
    height: 48,
    borderRadius: Radius.round,
    backgroundColor: Colors.iconActivePrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buyText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.surface,
  },
});

export default ProductDetails;
