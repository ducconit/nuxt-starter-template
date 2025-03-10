<template>
  <div class="container p-6 mx-auto space-y-6">
    <!-- Tiêu đề trang -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
      <div>
        <h1 class="text-2xl font-bold tracking-tight">Dashboard E-commerce</h1>
        <p class="text-muted-foreground text-sm mt-1">Tổng quan về hoạt động kinh doanh của bạn</p>
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
                Pick a date
              </template>
            </Button>
          </PopoverTrigger>
        </Popover>
      </div>
    </div>

    <!-- Thống kê tổng quan -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatisticCard title="Tổng doanh thu" value="₫45,231.89" trend="+20.1% từ tháng trước" :icon="DollarSignIcon" />
      <StatisticCard title="Đăng ký mới" value="+2,350" trend="+180.5% từ tháng trước" :icon="UsersIcon" />
      <StatisticCard title="Đơn hàng" value="+12,234" trend="+45.0% từ tháng trước" :icon="ShoppingCartIcon" />
      <StatisticCard title="Đang hoạt động" value="+573" trend="+20.1 từ giờ trước" :icon="ActivityIcon" />
    </div>

    <!-- Biểu đồ doanh thu và đơn hàng -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <Card class="lg:col-span-2 border border-border shadow-sm rounded-xl">
        <CardHeader class="p-6 flex items-center justify-between">
          <div>
            <CardTitle class="text-semibold tracking-tight">Doanh thu theo thời gian</CardTitle>
            <CardDescription>Biểu đồ doanh thu 30 ngày qua</CardDescription>
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
          <AreaChart :data="revenueData" index="date" :categories="['revenue', 'orders']" />
        </CardContent>
      </Card>
      <Card class="border border-border shadow-sm rounded-xl">
        <CardHeader class="p-6">
          <CardTitle class="text-semibold tracking-tight">Phân bổ doanh thu</CardTitle>
          <CardDescription>Theo danh mục sản phẩm</CardDescription>
        </CardHeader>
        <CardContent class="px-5 pb-5">
          <DonutChart index="category" :category="'value'" :data="categoryData" :value-formatter="valueFormatter" />
          <div class="mt-4 space-y-3">
            <div v-for="item in categoryData" :key="item.category" class="flex items-center justify-between text-sm">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: item.color }" />
                <span>{{ item.category }}</span>
              </div>
              <span class="font-medium">{{ valueFormatter(item.value) }}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Sản phẩm bán chạy và Phân tích khách hàng -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card class="border border-border shadow-sm rounded-xl">
        <CardHeader class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <CardTitle class="text-semibold tracking-tight">Sản phẩm bán chạy</CardTitle>
              <CardDescription>Top 5 sản phẩm có doanh số cao nhất</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              Xem tất cả
              <ChevronRightIcon class="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent class="px-5 pb-5">
          <div class="space-y-4">
            <div v-for="product in topProducts" :key="product.id" class="flex items-center gap-4">
              <img :src="product.image" :alt="product.name" class="w-12 h-12 rounded-lg object-cover" />
              <div class="flex-1 min-w-0">
                <p class="font-medium truncate">{{ product.name }}</p>
                <p class="text-sm text-muted-foreground">{{ product.category }}</p>
              </div>
              <div class="text-right">
                <p class="font-medium">{{ valueFormatter(product.revenue) }}</p>
                <p class="text-sm text-muted-foreground">{{ product.orders }} đơn</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="border border-border shadow-sm rounded-xl">
        <CardHeader class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <CardTitle class="text-semibold tracking-tight">Phân tích khách hàng</CardTitle>
              <CardDescription>Thống kê theo độ tuổi và giới tính</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent class="px-5 pb-5">
          <BarChart :data="customerData" index="age" :categories="['male', 'female']" />
          <div class="mt-4 grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <p class="text-sm font-medium">Giới tính</p>
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-primary" />
                  <span class="text-sm">Nam ({{ customerStats.malePercentage }}%)</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-3 h-3 rounded-full bg-[#FF6B6B]" />
                  <span class="text-sm">Nữ ({{ customerStats.femalePercentage }}%)</span>
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium">Độ tuổi phổ biến</p>
              <p class="text-2xl font-bold">{{ customerStats.popularAgeRange }}</p>
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
  BarChartIcon,
  PieChartIcon,
  MoreHorizontalIcon,
  PackageIcon,
  ShoppingBagIcon,
  UserIcon,
  MapPinIcon,
  SmartphoneIcon,
  DollarSignIcon,
  UsersIcon,
  ShoppingCartIcon,
  ActivityIcon,
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
import { cn } from '@/utils'
import { AreaChart } from '@/components/ui/chart-area'
import { BarChart } from '@/components/ui/chart-bar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
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

// Dữ liệu mẫu cho biểu đồ doanh thu
const revenueData = ref(Array.from({ length: 30 }, (_, i) => ({
  date: dayjs().subtract(29 - i, 'days').format('DD/MM'),
  revenue: Math.floor(Math.random() * 50000000) + 10000000,
  orders: Math.floor(Math.random() * 100) + 20
})))

// Dữ liệu mẫu cho biểu đồ danh mục
const categoryData = [
  { category: 'Điện thoại', value: 450000000, color: '#4C51BF' },
  { category: 'Laptop', value: 320000000, color: '#48BB78' },
  { category: 'Tablet', value: 280000000, color: '#4299E1' },
  { category: 'Phụ kiện', value: 150000000, color: '#ED8936' },
  { category: 'Khác', value: 100000000, color: '#9F7AEA' }
]

// Dữ liệu mẫu cho sản phẩm bán chạy
const topProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    category: 'Điện thoại',
    image: 'https://placehold.co/100',
    revenue: 120000000,
    orders: 24
  },
  {
    id: 2,
    name: 'MacBook Pro M3',
    category: 'Laptop',
    image: 'https://placehold.co/100',
    revenue: 95000000,
    orders: 18
  },
  {
    id: 3,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Điện thoại',
    image: 'https://placehold.co/100',
    revenue: 85000000,
    orders: 17
  },
  {
    id: 4,
    name: 'iPad Pro M2',
    category: 'Tablet',
    image: 'https://placehold.co/100',
    revenue: 75000000,
    orders: 15
  },
  {
    id: 5,
    name: 'AirPods Pro',
    category: 'Phụ kiện',
    image: 'https://placehold.co/100',
    revenue: 45000000,
    orders: 30
  }
]

// Dữ liệu mẫu cho phân tích khách hàng
const customerData = [
  { age: '18-24', male: 150, female: 180 },
  { age: '25-34', male: 250, female: 220 },
  { age: '35-44', male: 180, female: 170 },
  { age: '45-54', male: 120, female: 110 },
  { age: '55+', male: 80, female: 90 }
]

const customerStats = {
  malePercentage: 52,
  femalePercentage: 48,
  popularAgeRange: '25-34'
}

function valueFormatter(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(value)
}
</script>
