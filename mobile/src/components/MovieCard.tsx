import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Chip, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  const theme = useTheme();
  
  const averageRating = movie.ratings.length
    ? movie.ratings.reduce((acc, curr) => acc + curr.rating, 0) / movie.ratings.length
    : 0;

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover source={{ uri: movie.poster_url || 'https://via.placeholder.com/300x450' }} />
      <Card.Content style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <Text style={styles.year}>
          {movie.release_year} • {movie.director}
        </Text>
        
        <View style={styles.categoriesContainer}>
          {movie.categories.slice(0, 2).map((category) => (
            <Chip key={category.id} style={styles.categoryChip}>
              {category.name}
            </Chip>
          ))}
          {movie.categories.length > 2 && (
            <Text style={styles.moreCategories}>+{movie.categories.length - 2}</Text>
          )}
        </View>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{averageRating.toFixed(1)}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    maxWidth: '47%',
  },
  content: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  year: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  categoryChip: {
    marginRight: 4,
    marginBottom: 4,
    height: 24,
  },
  moreCategories: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'center',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default MovieCard; 