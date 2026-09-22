import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Courses, courses } from './src/data/courses';

interface CourseRowProps {
  course: Courses;
  onPress: (course: Courses) => void;
}

function CourseRow({ course, onPress }: CourseRowProps) {
  return (
    <Pressable
      onPress={() => onPress(course)}
      style={({ pressed }) => [
        styles.courseCard,
        pressed && styles.courseCardPressed,
      ]}
    >
      <Text style={styles.courseTitle}>{course.title}</Text>

      <Text style={styles.instructor}>
        Giảng viên: {course.instructor}
      </Text>

      <Text style={styles.category}>
        {course.category}
      </Text>

      <Text style={styles.studentCount}>
        {course.students} sinh viên
      </Text>
    </Pressable>
  );
}

function CourseListScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [sortAsc, setSortAsc] = useState(true);

  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // 1. Lấy danh sách category
  const categories = useMemo(() => {
    return ['Tất cả', ...new Set(courses.map((course) => course.category))];
  }, []);

  // 2. Lọc + sắp xếp bằng useMemo
  const filteredCourses = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('vi');

    const result = courses.filter((course) => {
      const matchKeyword =
        `${course.title} ${course.instructor} ${course.category}`
          .toLocaleLowerCase('vi')
          .includes(keyword);

      const matchCategory =
        category === 'Tất cả' ||
        course.category === category;

      return matchKeyword && matchCategory;
    });

    return [...result].sort((a, b) =>
      sortAsc
        ? a.students - b.students
        : b.students - a.students
    );
  }, [query, category, sortAsc]);

  // 3. Nhấn khóa học
  const openCourse = (course: Courses) => {
    Alert.alert(
      course.title,
      `Giảng viên: ${course.instructor}\n` +
        `Danh mục: ${course.category}\n` +
        `Số sinh viên: ${course.students}`
    );
  };

  // 4. Kéo xuống để refresh
  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // 5. Phân trang
  const onEndReached = () => {
    if (loadingMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      setLoadingMore(false);
    }, 1000);
  };

  return (
    <FlatList
      data={filteredCourses}
      keyExtractor={(item) => item.id}

      renderItem={({ item }) => (
        <CourseRow
          course={item}
          onPress={openCourse}
        />
      )}

      // 7. Dạng lưới 2 cột
      numColumns={2}

      columnWrapperStyle={styles.row}

      // Refresh
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }

      // Pagination
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}

      // Header
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.screenTitle}>
            Course Catalog
          </Text>

          <Text style={styles.subtitle}>
            Khám phá các khóa học đang mở
          </Text>

          {/* Search */}
          <View style={styles.searchContainer}>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Tìm khóa học..."
              placeholderTextColor="#888"
              style={styles.searchInput}
            />

            {/* 1. Nút xóa tìm kiếm */}
            {query.length > 0 && (
              <Pressable
                onPress={() => setQuery('')}
                style={styles.clearButton}
              >
                <Text style={styles.clearText}>✕</Text>
              </Pressable>
            )}
          </View>

          {/* 2. Bộ lọc danh mục */}
          <Text style={styles.filterTitle}>
            Danh mục
          </Text>

          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setCategory(item)}
                style={[
                  styles.categoryButton,
                  category === item &&
                    styles.categoryButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    category === item &&
                      styles.categoryButtonTextActive,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />

          {/* 3. Sắp xếp */}
          <Pressable
            onPress={() => setSortAsc(!sortAsc)}
            style={styles.sortButton}
          >
            <Text style={styles.sortText}>
              {sortAsc
                ? '↑ Ít sinh viên → Nhiều sinh viên'
                : '↓ Nhiều sinh viên → Ít sinh viên'}
            </Text>
          </Pressable>

          <Text style={styles.resultText}>
            Tìm thấy {filteredCourses.length} khóa học
          </Text>
        </View>
      }

      // 6. Trạng thái tải
      ListFooterComponent={
        loadingMore ? (
          <View style={styles.footer}>
            <ActivityIndicator size="small" />
            <Text style={styles.loadingText}>
              Đang tải thêm...
            </Text>
          </View>
        ) : null
      }

      // Không có kết quả
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            Không tìm thấy khóa học
          </Text>

          <Text style={styles.emptyText}>
            Hãy thử từ khóa hoặc danh mục khác.
          </Text>
        </View>
      }

      ItemSeparatorComponent={() => (
        <View style={styles.separator} />
      )}

      contentContainerStyle={styles.listContent}
    />
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CourseListScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },

  listContent: {
    padding: 16,
  },

  header: {
    marginBottom: 16,
  },

  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 16,
    color: '#666',
  },

  searchContainer: {
    position: 'relative',
  },

  searchInput: {
    height: 48,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingRight: 45,
  },

  clearButton: {
    position: 'absolute',
    right: 12,
    top: 12,
  },

  clearText: {
    fontSize: 18,
    color: '#777',
  },

  filterTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#333',
  },

  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },

  categoryButtonActive: {
    backgroundColor: '#333',
  },

  categoryButtonText: {
    color: '#555',
  },

  categoryButtonTextActive: {
    color: '#FFF',
  },

  sortButton: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },

  sortText: {
    textAlign: 'center',
    fontWeight: '500',
  },

  resultText: {
    marginTop: 12,
    color: '#555',
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  courseCard: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 12,
    minHeight: 150,
    marginHorizontal: 4,
  },

  courseCardPressed: {
    opacity: 0.7,
  },

  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },

  instructor: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },

  category: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
  },

  studentCount: {
    fontSize: 13,
    color: '#555',
  },

  separator: {
    height: 0,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  emptyText: {
    marginTop: 8,
    color: '#777',
  },

  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 8,
    color: '#777',
  },
});
