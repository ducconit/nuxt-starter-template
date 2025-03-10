<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

definePageMeta({
  layout: 'auth',
})
</script>

<template>
  <div class="flex justify-center items-center min-h-screen min-w-screen">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          Forgot Password
        </CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              required
            />
          </div>
          <Button
            type="submit"
            class="w-full"
          >
            Reset
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          <NuxtLink
            to="/login"
            class="underline"
          >
            Back to login
          </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
