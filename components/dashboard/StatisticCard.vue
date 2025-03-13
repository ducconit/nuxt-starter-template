<template>
  <Card class="border border-border shadow-sm hover:shadow transition-shadow duration-200 rounded-xl">
    <CardHeader class="flex flex-row items-center justify-between pb-2">
      <CardTitle class="text-sm text-muted-foreground tracking-tight font-medium">{{ title }}</CardTitle>
      <Component :is="icon" class="size-6 text-muted-foreground" />
    </CardHeader>
    <CardContent class="p-6 pt-0">
      <div class="text-3xl font-bold tracking-tight">{{ value }}</div>
      <p class="text-xs text-muted-foreground mt-1">{{ trend }}</p>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  trend: {
    type: String,
    required: false
  },
  icon: {
    type: Function,
    required: true
  }
})
</script>
