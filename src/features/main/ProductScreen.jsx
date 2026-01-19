import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';

import { getAllProducts } from '@service/http.service';
import { Colors, Fonts, Spacing, Radius, Shadows } from '@theme';
import {
  LayoutGrid,
  List,
  Search,
  Heart,
  Plus,
  Star,
} from 'lucide-react-native';
import { navigate } from '@navigation/NavigationRef';
import ScreenNames from '@constants/ScreenNames';

const PAGE_SIZE = 20;


const StarRating = ({ rating }) => {
  const filled = Math.round(rating);
  return (
    <View style={styles.starRow}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={14}
          color={i <= filled ? Colors.starActive : Colors.starInactive}
          fill={i <= filled ? Colors.starActive : 'transparent'}
        />
      ))}
    </View>
  );
};

const ProductScreen = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  const products = data?.data?.products ?? [];


  const searchedProducts = useMemo(() => {
    return products.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);


  const paginatedProducts = useMemo(() => {
    return searchedProducts.slice(0, page * PAGE_SIZE);
  }, [searchedProducts, page]);


  const flatData = useMemo(() => {
    return paginatedProducts;
  }, [paginatedProducts]);


  const loadMore = () => {
    if (page * PAGE_SIZE < searchedProducts.length) {
      setPage(p => p + 1);
    }
  };


  const renderItem = ({ item }) => {
    const isList = !isGrid;

    return (
      <TouchableOpacity style={[styles.card, isList && styles.cardList]} onPress={() => navigate(ScreenNames.ProductDetailsScreen, {
        product: item,
      })}>

        {isGrid && (
          <View style={styles.topRowCard}>
            <View style={styles.ratingContainer}>
              <Star size={14} color={Colors.starActive} fill={Colors.starActive} />
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>
            <TouchableOpacity style={styles.heartBtn}>
              <Heart size={18} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        )}

        <FastImage
          source={{ uri: item.thumbnail }}
          style={[styles.image, isList && styles.imageList]}
          resizeMode={FastImage.resizeMode.contain}
        />

        <View style={[styles.content, isList && styles.contentList]}>

          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>

          {isList && <StarRating rating={item.rating} />}



          <View style={styles.bottomRow}>
            <Text style={styles.price}>₹ {item.price}</Text>

            {isGrid && (
              <TouchableOpacity style={styles.addBtn}>
                <Plus size={16} color={Colors.textPrimary} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={[Colors.splashGradientStart, Colors.splashGradientEnd]}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>Explore</Text>


      <View style={styles.searchRow}>
        <Search size={18} color={Colors.textSecondary} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={Colors.textSecondary}
          value={search}
          onChangeText={t => {
            setSearch(t);
            setPage(1);
          }}
          style={styles.searchInput}
        />
      </View>


      <View style={styles.topRow}>
        <Text style={styles.countText}>
          Products ({searchedProducts.length})
        </Text>

        <View style={styles.toggleRow}>

          <TouchableOpacity onPress={() => setIsGrid(false)}>
            <List
              size={20}
              color={!isGrid ? Colors.iconActivePrimary : Colors.iconInactive}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsGrid(true)}>
            <LayoutGrid
              size={20}
              color={isGrid ? Colors.iconActivePrimary : Colors.iconInactive}
            />
          </TouchableOpacity>
        </View>
      </View>


      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={Colors.success} />
        </View>
      ) : (
        <FlatList
          data={flatData}
          key={isGrid ? 'GRID' : 'LIST'}
          keyExtractor={(item, index) => `p-${item.id}`}
          renderItem={renderItem}
          numColumns={isGrid ? 2 : 1}
          columnWrapperStyle={isGrid ? styles.columnWrapper : null}
          onEndReached={loadMore}
          onEndReachedThreshold={0.6}
          showsVerticalScrollIndicator={false}
        />
      )}
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.md,
  },

  header: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    paddingTop: Spacing.md
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    height: 46,
    marginBottom: Spacing.md,
  },

  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },

  countText: {
    fontFamily: Fonts.medium,
    color: Colors.textSecondary,
  },

  toggleRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },

  sectionTitle: {
    width: '100%',
    fontFamily: Fonts.medium,
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },

  topRowCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  ratingText: {
    fontFamily: Fonts.semiBold,
    fontSize: 12,
    color: Colors.textPrimary,
  },
 

  columnWrapper: {
    justifyContent: 'space-between',
    gap: Spacing.md,
  },

  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },

  cardList: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: 120,
  },

  imageList: {
    width: 120,
    height: 80,
  },

  content: {
    marginTop: Spacing.sm,
  },

  contentList: {
    flex: 1,
    marginLeft: Spacing.md,
    marginTop: 0,
  },

  title: {
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,

  },

  price: {
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  addBtn: {
    backgroundColor: Colors.primary,
    width: 28,
    height: 28,
    borderRadius: Radius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },

  heartBtn: {
    padding: 4,
  },

  starRow: {
    flexDirection: 'row',
    marginVertical: Spacing.xs,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductScreen;
