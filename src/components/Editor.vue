<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import EditorHeader from "@/components/EditorHeader.vue";
import { useEditorHeader } from "@/stores/editorHeader";
import { storeToRefs } from "pinia";
import { exec } from "@/utils/editor-utils";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
});

const useEditorHeaderStore = useEditorHeader();
const { textType } = storeToRefs(useEditorHeaderStore);

const el = ref<HTMLElement>();
const emit = defineEmits(["input"]);

onMounted(() => {
  el.value!.innerHTML = props.value;

  el.value!.focus();
});

watch(
  () => props.value,
  (newValue) => {
    if (el.value!.innerHTML !== newValue) el.value!.innerHTML = newValue;
  }
);

watch(
  textType,
  (newValue) => {
    console.log("newValue: ", newValue);
  },
  { deep: true }
);

const handleInput = (e: InputEvent | KeyboardEvent) => {
  const { firstChild } = e.target as HTMLElement;

  if (firstChild && firstChild.nodeType === 3) {
    exec("formatBlock", "<p>");
  } else if (el.value!.innerHTML === "<br>") el.value!.innerHTML = "";

  emit("input", el.value!.innerHTML);
};
const handleDelayedInput = (e: KeyboardEvent) => {
  nextTick(() => handleInput(e));
};
</script>

<template>
  <EditorHeader />
  <div
    class="border p-1 h-20 focus:outline-none"
    ref="el"
    contenteditable
    @input="handleInput"
  />
</template>

<style></style>
