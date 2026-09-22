import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';

interface CustomError {
  Code: string | number;
  Message: string;
  Details?: string;
}

const toCustomError = (error: unknown): CustomError => {
  if (error instanceof Error) {
    return {
      Code: 'NETWORK_OR_CLIENT_ERROR',
      Message: error.message || 'Đã xảy ra lỗi',
      Details: error.stack,
    };
  }

  return {
    Code: 'UNKNOWN_ERROR',
    Message: 'Đã xảy ra lỗi',
  };
};

export default function Bai12() {
  const testError = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
    } catch (error: unknown) {
      const customError = toCustomError(error);

      Alert.alert(
        'Lỗi API',
        `${customError.Code}\n${customError.Message}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Gọi API lỗi" onPress={testError} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
});