<script setup lang="ts">
defineProps<{
  id: string
}>()
import {ref} from "vue";
const anValue = ref("wybzd");
const saValue = ref("");
const saclick = () => {
	saValue.value = anValue.value
}
 </script>

<template>
	<div class="welcome_first">
		<div>{{id}}</div>
		<div>please ask your answer</div>
	</div>
	<input type="text" v-model="anValue" placeholder="text" />
	<button @click="saclick">enter</button>
	<p>{{anValue}}</p>
	<p>{{saValue}}</p>


</template>

<style scoped>
.welcome_first{
	display: flex;
}
.welcome_first div{
	width: 150px;
	height: 80px;
	background-color: palegreen;
	text-align: center;
}
</style>
