<script setup lang="ts">
import { type TextType, useEditorHeader } from "@/stores/editorHeader";
import { storeToRefs } from "pinia";

const editorHeaderStore = useEditorHeader();
const { textType } = storeToRefs(editorHeaderStore);

const handleTextType = (e: MouseEvent) => {
  const target =
    (e.target as HTMLElement).nodeName === "BUTTON"
      ? (e.target as HTMLElement)
      : ((e.target as HTMLElement).closest("button") as HTMLElement);

  if (!target) return;

  const targetValue = target.dataset.type as TextType;

  editorHeaderStore.setTextType(targetValue);
};
</script>
<template>
  <div class="flex flex-row bg-gray-100 h-8 w-full rounded-t-sm p-1">
    <div class="flex items-center justify-center">
      <div @click="handleTextType" class="inline-flex" role="group">
        <button
          data-type="bold"
          type="button"
          :class="{ 'bg-gray-400': textType.has('bold') }"
          class="rounded-l-sm w-6 h-6 inline-block bg-gray-300 text-black uppercase hover:bg-gray-400 focus:bg-gray-400 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        >
          <b>B</b>
        </button>
        <button
          data-type="italic"
          type="button"
          :class="{ 'bg-gray-400': textType.has('italic') }"
          class="inline-block w-6 h-6 bg-gray-300 text-black uppercase hover:bg-gray-400 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        >
          <i>I</i>
        </button>
        <button
          data-type="underline"
          type="button"
          :class="{ 'bg-gray-400': textType.has('underline') }"
          class="rounded-r-sm inline-block w-6 h-6 bg-gray-300 text-black uppercase hover:bg-gray-400 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        >
          <u>U</u>
        </button>
      </div>
    </div>
  </div>
</template>
