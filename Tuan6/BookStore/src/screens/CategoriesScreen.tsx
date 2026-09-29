import React from 'react';
import Screen from '../components/Screen';
import Header from '../components/Header';
import { EmptyView } from '../components/StateViews';

/** Tab thứ 2 của Bottom Tab (Tuần 5 chỉ cần dựng khung điều hướng) */
export default function CategoriesScreen() {
  return (
    <Screen header={<Header title="Danh mục" />}>
      <EmptyView icon="grid-outline" title="Danh mục sách" subtitle="Màn hình này sẽ được hoàn thiện ở các tuần sau." />
    </Screen>
  );
}
