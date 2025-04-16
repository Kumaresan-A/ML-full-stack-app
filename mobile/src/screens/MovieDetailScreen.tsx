import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Text, Button, Chip, useTheme, Rating } from 'react-native-paper';
import { RouteProp, useRoute } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchMovieById, fetchRecommendations, rateMovie } from '../store/movieSlice';
import { RootStackParamList } from '../types';

type MovieDetailRouteProp = RouteProp<RootStackParamList, 'MovieDetail'>;

const MovieDetailScreen = () => {
  const route = useRoute<MovieDetailRouteProp>();
  const { movieId } = route.params;
  const dispatch = useAppDispatch();
  const theme = useTheme();
  
  const { selectedMovie, recommendations, loading, error } = useAppSelector(state => state.movies);
  const [userRating, setUserRating] = useState<number>(0);
  
  // Temporary user ID - would be replaced with actual user ID from authentication
  const userId = 'temp-user';

  useEffect(() => {
    dispatch(fetchMovieById(movieId));
  }, [dispatch, movieId]);

  const handleRateMovie = async (rating: number) => {
    setUserRating(rating);
    await dispatch(rateMovie({ movieId, rating, userId }));
    dispatch(fetchRecommendations(movieId));
  };

  if (loading || !selectedMovie) {
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

  const averageRating = selectedMovie.ratings.length
    ? selectedMovie.ratings.reduce((acc, curr) => acc + curr.rating, 0) / selectedMovie.ratings.length
    : 0;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: selectedMovie.poster_url || 'https://via.placeholder.com/300x450' }}
        style={styles.poster}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{selectedMovie.title}</Text>
        <Text style={styles.year}>
          {selectedMovie.release_year} • Directed by {selectedMovie.director}
        </Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Average Rating:</Text>
          <Text style={styles.ratingValue}>{averageRating.toFixed(1)} / 5</Text>
        </View>
        
        <View style={styles.categoriesContainer}>
          {selectedMovie.categories.map((category) => (
            <Chip key={category.id} style={styles.categoryChip}>
              {category.name}
            </Chip>
          ))}
        </View>
        
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{selectedMovie.description}</Text>
        
        <Text style={styles.sectionTitle}>Rate this movie</Text>
        <View style={styles.ratingButtons}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <Button
              key={rating}
              mode={userRating === rating ? 'contained' : 'outlined'}
              onPress={() => handleRateMovie(rating)}
              style={styles.ratingButton}
            >
              {rating}
            </Button>
          ))}
        </View>
        
        {recommendations.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>You might also like</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recommendations.map((movie) => (
                <View key={movie.id} style={styles.recommendationItem}>
                  <Image
                    source={{ uri: movie.poster_url || 'https://via.placeholder.com/150x225' }}
                    style={styles.recommendationPoster}
                  />
                  <Text style={styles.recommendationTitle} numberOfLines={1}>
                    {movie.title}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  poster: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  year: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  ratingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  ratingButton: {
    marginHorizontal: 4,
  },
  recommendationItem: {
    width: 150,
    marginRight: 16,
  },
  recommendationPoster: {
    width: 150,
    height: 225,
    borderRadius: 8,
  },
  recommendationTitle: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default MovieDetailScreen; 