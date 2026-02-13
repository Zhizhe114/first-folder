<template>
	<Navbar/>
	{{route.name}}
</template>

<script setup lang="ts">

import { ref } from "vue";
import { useRoute,useRouter } from "vue-router";
	const route = useRoute()
	const router = useRouter()
</script>

<style>
</style>