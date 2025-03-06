<script setup lang="ts">
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import {
  BellIcon,
  BookOpenIcon,
  HelpCircleIcon,
  LifeBuoyIcon,
  LogOutIcon,
  MessageSquareIcon,
  SettingsIcon,
  UserIcon,
  VideoIcon,
  SearchIcon,
} from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const isShowGlobalSearch = ref(false)
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
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

        <div class="ml-auto flex items-center gap-4 px-4">
          <!-- Search Input -->
          <div class="ml-auto mr-4 hidden md:block">
            <Button @click="isShowGlobalSearch = true"
              class="flex h-9 w-[300px] items-center rounded-md border border-input bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
              <SearchIcon class="mr-2 h-4 w-4" />
              <span>Tìm kiếm...</span>
              <kbd
                class="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span class="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>

          <!-- Mobile Search Button -->
          <Button
          @click="isShowGlobalSearch = true"
            class="flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted md:hidden">
            <SearchIcon class="h-5 w-5" />
            <span class="sr-only">Tìm kiếm</span>
          </Button>

          <!-- Dropdown thông báo với badge chấm đỏ -->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <div class="relative">
                <button
                  class="flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted">
                  <BellIcon class="h-5 w-5" />
                  <span class="sr-only">Thông báo</span>
                </button>
                <!-- Badge chấm đỏ -->
                <div
                  class="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                  3
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-80">
              <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div class="max-h-80 overflow-y-auto">
                <DropdownMenuItem v-for="i in 3" :key="i" class="flex flex-col items-start py-2">
                  <div class="font-medium">Thông báo mới #{{ i }}</div>
                  <div class="text-sm text-muted-foreground">Bạn có một thông báo mới từ hệ thống.</div>
                  <div class="mt-1 text-xs text-muted-foreground">{{ i }} giờ trước</div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem class="justify-center font-medium">
                Xem tất cả thông báo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <!-- Biểu tượng dấu hỏi trong vòng tròn để trợ giúp -->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <button
                class="flex h-9 w-9 items-center justify-center rounded-full border text-sm font-medium transition-colors hover:bg-muted">
                <HelpCircleIcon class="h-5 w-5" />
                <span class="sr-only">Trợ giúp</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-64">
              <DropdownMenuLabel>Trợ giúp</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <BookOpenIcon class="mr-2 h-4 w-4" />
                <span>Tài liệu hướng dẫn</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <VideoIcon class="mr-2 h-4 w-4" />
                <span>Video hướng dẫn</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquareIcon class="mr-2 h-4 w-4" />
                <span>Hỗ trợ trực tuyến</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LifeBuoyIcon class="mr-2 h-4 w-4" />
                <span>Liên hệ hỗ trợ</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <!-- Avatar người dùng -->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Avatar class="h-8 w-8 cursor-pointer">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon class="mr-2 h-4 w-4" />
                <span>Hồ sơ</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon class="mr-2 h-4 w-4" />
                <span>Cài đặt</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOutIcon class="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main>
        <slot />
      </main>
    </SidebarInset>

    <!-- Search Modal -->
  <Dialog :open="isShowGlobalSearch" @update:open="isShowGlobalSearch = $event">
    <DialogContent class="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Search</DialogTitle>
        <DialogDescription>
          Enter the keyword to search for content in the application.
        </DialogDescription>
      </DialogHeader>
      <div class="relative">
        <SearchIcon class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          class="pl-9"
          placeholder="Tìm kiếm..."
          @keydown.esc="isShowGlobalSearch = false"
        />
      </div>
    </DialogContent>
  </Dialog>
  </SidebarProvider>
</template>
