import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Chip, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchMovies, fetchCategories } from '../store/movieSlice';
import MovieCard from '../components/MovieCard';
import { RootStackParamList, Category } from '../types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  
  const { movies, categories, loading, error } = useAppSelector(state => state.movies);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleMoviePress = (movieId: number) => {
    navigation.navigate('MovieDetail', { movieId });
  };

  const handleCategoryPress = (categoryName: string) => {
    if (categoryName === 'all') {
      setSelectedCategory('all');
    } else {
      setSelectedCategory(categoryName);
      navigation.navigate('CategoryMovies', { categoryName });
    }
  };

  const filteredMovies = selectedCategory === 'all'
    ? movies
    : movies.filter(movie =>
        movie.categories.some(category => category.name === selectedCategory)
      );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ id: 'all', name: 'all' } as Category, ...categories]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Chip
              style={[
                styles.categoryChip,
                selectedCategory === item.name && { backgroundColor: theme.colors.primary }
              ]}
              textStyle={selectedCategory === item.name ? { color: 'white' } : {}}
              onPress={() => handleCategoryPress(item.name)}
            >
              {item.name === 'all' ? 'All' : item.name}
            </Chip>
          )}
        />
      </View>

      <Text style={styles.sectionTitle}>Movies</Text>
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => handleMoviePress(item.id)}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.movieList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  categoryChip: {
    marginRight: 8,
  },
  movieList: {
    paddingBottom: 16,
  },
});

export default HomeScreen; 