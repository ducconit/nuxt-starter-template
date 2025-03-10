<template>
  <div class="container p-6 mx-auto space-y-6">
    <!-- Tiêu đề trang -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Dashboard LMS</h1>
        <p class="text-muted-foreground text-sm mt-1">Tổng quan về hoạt động học tập</p>
      </div>
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Popover>
          <PopoverContent class="w-auto p-0">
            <RangeCalendar v-model="dateRange" initial-focus :number-of-months="2" />
          </PopoverContent>

          <PopoverTrigger as-child>
            <Button variant="outline" :class="cn(
              'w-[280px] justify-start text-left font-normal',
              !dateRange && 'text-muted-foreground',
            )">
              <CalendarIcon class="mr-2 h-4 w-4" />
              <template v-if="dateRange.start">
                <template v-if="dateRange.end">
                  {{ df.format(dateRange.start.toDate(getLocalTimeZone())) }} - {{
                    df.format(dateRange.end.toDate(getLocalTimeZone())) }}
                </template>
                <template v-else>
                  {{ df.format(dateRange.start.toDate(getLocalTimeZone())) }}
                </template>
              </template>
              <template v-else>
                Chọn ngày
              </template>
            </Button>
          </PopoverTrigger>
        </Popover>
      </div>
    </div>

    <!-- Thống kê tổng quan -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatisticCard title="Tổng học viên" value="1,234" trend="+20.1% từ tháng trước" :icon="UsersIcon" />
      <StatisticCard title="Khóa học hoạt động" value="45" trend="+5 khóa mới" :icon="BookOpenIcon" />
      <StatisticCard title="Bài tập đã nộp" value="856" trend="+180 tuần này" :icon="ClipboardCheckIcon" />
      <StatisticCard title="Tỷ lệ hoàn thành" value="78.5%" trend="+5.2% từ tháng trước" :icon="TrendingUpIcon" />
    </div>

    <!-- Biểu đồ hoạt động và tiến độ -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <Card class="lg:col-span-2 border border-border shadow-sm rounded-xl">
        <CardHeader class="p-6 flex items-center justify-between">
          <div>
            <CardTitle class="text-semibold tracking-tight">Hoạt động học tập</CardTitle>
            <CardDescription>Thống kê theo thời gian</CardDescription>
          </div>
          <Select v-model="selectedTimeRange" class="w-[180px]">
            <SelectTrigger>
              <SelectValue placeholder="Chọn thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 ngày qua</SelectItem>
              <SelectItem value="30">30 ngày qua</SelectItem>
              <SelectItem value="90">90 ngày qua</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent class="px-5 pb-5">
          <AreaChart :data="activityData" index="date" :categories="['submissions', 'activeUsers']" />
        </CardContent>
      </Card>
      <Card class="border border-border shadow-sm rounded-xl">
        <CardHeader class="p-6">
          <CardTitle class="text-semibold tracking-tight">Phân bổ học viên</CardTitle>
          <CardDescription>Theo trình độ</CardDescription>
        </CardHeader>
        <CardContent class="px-5 pb-5">
          <DonutChart index="level" :category="'value'" :data="levelData" :value-formatter="valueFormatter" />
          <div class="mt-4 space-y-3">
            <div v-for="item in levelData" :key="item.level" class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: item.color }" />
                <span>{{ item.level }}</span>
              </div>
              <span class="font-medium">{{ item.value }} học viên</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Khóa học và Tiến độ học tập -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card class="border border-border shadow-sm rounded-xl">
        <CardHeader class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <CardTitle class="text-semibold tracking-tight">Khóa học phổ biến</CardTitle>
              <CardDescription>Top 5 khóa học có nhiều học viên nhất</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Xem tất cả
              <ChevronRightIcon class="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent class="px-5 pb-5">
          <div class="space-y-4">
            <div v-for="course in topCourses" :key="course.id" class="flex items-center gap-4">
              <img :src="course.image" :alt="course.name" class="w-12 h-12 rounded-lg object-cover" />
              <div class="flex-1 min-w-0">
                <p class="font-medium truncate">{{ course.name }}</p>
                <p class="text-sm text-muted-foreground">{{ course.instructor }}</p>
              </div>
              <div class="text-right">
                <p class="font-medium">{{ course.students }} học viên</p>
                <p class="text-sm text-muted-foreground">{{ course.rating }} ⭐</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="border border-border shadow-sm rounded-xl">
        <CardHeader class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <CardTitle class="text-semibold tracking-tight">Tiến độ học tập</CardTitle>
              <CardDescription>Phân tích theo môn học</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent class="px-5 pb-5">
          <div class="space-y-4">
            <div v-for="subject in subjectProgress" :key="subject.id" class="space-y-2">
              <div class="flex justify-between">
                <span class="font-medium">{{ subject.name }}</span>
                <span class="text-sm">{{ subject.completed }}/{{ subject.total }} bài học</span>
              </div>
              <Progress :value="(subject.completed / subject.total) * 100" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import {
  UsersIcon,
  BookOpenIcon,
  ClipboardCheckIcon,
  TrendingUpIcon,
  CalendarIcon,
  ChevronRightIcon
} from 'lucide-vue-next'
import StatisticCard from '@/components/dashboard/StatisticCard.vue'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { DateRange } from 'reka-ui'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/utils'
import { AreaChart } from '@/components/ui/chart-area'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { DonutChart } from '@/components/ui/chart-donut'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
})

const dayjs = useDayjs()
const now = dayjs()
const startDate = now.subtract(30, 'day')

const dateRange = ref({
  start: new CalendarDate(startDate.year(), startDate.month() + 1, startDate.date()),
  end: new CalendarDate(now.year(), now.month() + 1, now.date()),
}) as Ref<DateRange>

const selectedTimeRange = ref('30')

// Dữ liệu mẫu cho biểu đồ hoạt động
const activityData = ref(Array.from({ length: 30 }, (_, i) => ({
  date: dayjs().subtract(29 - i, 'days').format('DD/MM'),
  submissions: Math.floor(Math.random() * 50) + 10,
  activeUsers: Math.floor(Math.random() * 100) + 30
})))

// Dữ liệu mẫu cho biểu đồ phân bổ học viên
const levelData = [
  { level: 'Mới bắt đầu', value: 450, color: '#4C51BF' },
  { level: 'Trung cấp', value: 320, color: '#48BB78' },
  { level: 'Nâng cao', value: 280, color: '#4299E1' },
  { level: 'Chuyên gia', value: 150, color: '#ED8936' }
]

// Dữ liệu mẫu cho khóa học phổ biến
const topCourses = [
  {
    id: 1,
    name: 'Lập trình Python cơ bản',
    instructor: 'TS. Nguyễn Văn A',
    image: 'https://placehold.co/100',
    students: 1240,
    rating: 4.8
  },
  {
    id: 2,
    name: 'JavaScript nâng cao',
    instructor: 'ThS. Trần Thị B',
    image: 'https://placehold.co/100',
    students: 980,
    rating: 4.7
  },
  {
    id: 3,
    name: 'Machine Learning cơ bản',
    instructor: 'TS. Lê Văn C',
    image: 'https://placehold.co/100',
    students: 850,
    rating: 4.9
  },
  {
    id: 4,
    name: 'React.js cho người mới',
    instructor: 'KS. Phạm Thị D',
    image: 'https://placehold.co/100',
    students: 750,
    rating: 4.6
  },
  {
    id: 5,
    name: 'SQL và cơ sở dữ liệu',
    instructor: 'ThS. Hoàng Văn E',
    image: 'https://placehold.co/100',
    students: 680,
    rating: 4.7
  }
]

// Dữ liệu mẫu cho tiến độ học tập
const subjectProgress = [
  {
    id: 1,
    name: 'Lập trình cơ bản',
    completed: 8,
    total: 10
  },
  {
    id: 2,
    name: 'Cấu trúc dữ liệu',
    completed: 6,
    total: 12
  },
  {
    id: 3,
    name: 'Giải thuật',
    completed: 4,
    total: 8
  },
  {
    id: 4,
    name: 'Cơ sở dữ liệu',
    completed: 7,
    total: 10
  }
]

function valueFormatter(value: number): string {
  return value.toString()
}
</script>
