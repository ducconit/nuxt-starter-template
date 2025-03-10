<script setup lang="ts">
import { Search, Bell, BellDot, HelpCircle } from 'lucide-vue-next'
import { ref, onMounted, computed } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import AppSidebar from '@/components/AppSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Biến cho chức năng tìm kiếm
const searchOpen = ref(false)
const searchQuery = ref('')

// Biến cho chức năng thông báo
const hasNewNotifications = ref(false)
const notifications = ref([
  { id: 1, title: 'Thông báo mới', message: 'Bạn có một thông báo mới', read: false, time: '5 phút trước' },
  { id: 2, title: 'Cập nhật hệ thống', message: 'Hệ thống vừa được cập nhật', read: true, time: '1 giờ trước' },
  { id: 3, title: 'Lời nhắc', message: 'Bạn có cuộc họp vào 15:00', read: true, time: '2 giờ trước' },
  { id: 4, title: 'Thông báo quan trọng', message: 'Vui lòng cập nhật thông tin cá nhân', read: false, time: '3 giờ trước' },
])

// Tính toán số lượng thông báo chưa đọc
const unreadNotificationsCount = computed(() => {
  return notifications.value.filter(notification => !notification.read).length
})

// URL cho trang tài liệu
const documentationUrl = '/documentation'

// Hàm mở modal tìm kiếm
const openSearchModal = () => {
  searchOpen.value = true
}

// Hàm đóng modal tìm kiếm
const closeSearchModal = () => {
  searchOpen.value = false
}

// Hàm xử lý khi chọn kết quả tìm kiếm
const handleSelect = (_item: any) => {
  // Xử lý khi người dùng chọn một kết quả tìm kiếm
  closeSearchModal()
}

// Hàm đánh dấu tất cả thông báo đã đọc
const markAllAsRead = () => {
  notifications.value.forEach((notification) => {
    notification.read = true
  })
  hasNewNotifications.value = false
}

// Kiểm tra xem có thông báo mới không
onMounted(() => {
  hasNewNotifications.value = unreadNotificationsCount.value > 0
  // Xử lý phím tắt Ctrl+K để mở modal tìm kiếm
  onKeyStroke(['Ctrl', 'k'], openSearchModal)
})
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
      >
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator
            orientation="vertical"
            class="mr-2 h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <!-- Các chức năng ở góc phải nav header -->
        <div class="ml-auto flex items-center gap-4 px-4">
          <!-- Tìm kiếm -->
          <Button
            variant="ghost"
            size="icon"
            class="relative"
            @click="openSearchModal"
          >
            <Search class="h-5 w-5" />
            <span class="sr-only">Tìm kiếm</span>
          </Button>

          <!-- Thông báo -->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                variant="ghost"
                size="icon"
                class="relative"
              >
                <Bell
                  v-if="!hasNewNotifications"
                  class="h-5 w-5"
                />
                <BellDot
                  v-else
                  class="h-5 w-5"
                />
                <Badge
                  v-if="unreadNotificationsCount > 0"
                  class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center p-0 text-xs"
                  variant="destructive"
                >
                  {{ unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount }}
                  <span class="sr-only">{{ unreadNotificationsCount }} thông báo chưa đọc</span>
                </Badge>
                <span class="sr-only">Thông báo</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              class="w-80"
            >
              <DropdownMenuLabel class="flex items-center justify-between">
                <span>Thông báo</span>
                <Button
                  variant="ghost"
                  size="sm"
                  class="text-xs"
                  @click="markAllAsRead"
                >
                  Đánh dấu đã đọc
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div class="max-h-[300px] overflow-y-auto">
                <template v-if="notifications.length > 0">
                  <DropdownMenuItem
                    v-for="notification in notifications"
                    :key="notification.id"
                    class="flex flex-col items-start gap-1 p-3"
                  >
                    <div class="flex w-full justify-between">
                      <span
                        class="font-medium"
                        :class="{ 'text-primary': !notification.read }"
                      >{{ notification.title
                      }}</span>
                      <span class="text-xs text-muted-foreground">{{ notification.time }}</span>
                    </div>
                    <span class="text-sm text-muted-foreground">{{ notification.message }}</span>
                  </DropdownMenuItem>
                </template>
                <div
                  v-else
                  class="p-4 text-center text-sm text-muted-foreground"
                >
                  Không có thông báo nào
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <!-- Trợ giúp -->
          <NuxtLink :to="documentationUrl">
            <Button
              variant="ghost"
              size="icon"
            >
              <HelpCircle class="h-5 w-5" />
              <span class="sr-only">Trợ giúp</span>
            </Button>
          </NuxtLink>
        </div>
      </header>
      <main>
        <slot />
      </main>
    </SidebarInset>

    <!-- Modal tìm kiếm -->
    <CommandDialog
      v-model:open="searchOpen"
      @keydown.escape="closeSearchModal"
    >
      <CommandInput
        v-model="searchQuery"
        placeholder="Tìm kiếm..."
      />
      <CommandList>
        <CommandEmpty>Không tìm thấy kết quả nào.</CommandEmpty>
        <CommandGroup heading="Đề xuất">
          <CommandItem
            value="dashboard"
            @select="handleSelect({ id: 1, title: 'Dashboard' })"
          >
            <Search class="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem
            value="users"
            @select="handleSelect({ id: 2, title: 'Người dùng' })"
          >
            <Search class="mr-2 h-4 w-4" />
            <span>Người dùng</span>
          </CommandItem>
          <CommandItem
            value="settings"
            @select="handleSelect({ id: 3, title: 'Cài đặt' })"
          >
            <Search class="mr-2 h-4 w-4" />
            <span>Cài đặt</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Tài liệu">
          <CommandItem
            value="guide"
            @select="handleSelect({ id: 4, title: 'Hướng dẫn' })"
          >
            <Search class="mr-2 h-4 w-4" />
            <span>Hướng dẫn</span>
          </CommandItem>
          <CommandItem
            value="api"
            @select="handleSelect({ id: 5, title: 'API' })"
          >
            <Search class="mr-2 h-4 w-4" />
            <span>API</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </SidebarProvider>
</template>
