<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
});

const el = ref<HTMLElement>();
const emit = defineEmits(["input"]);

onMounted(() => {
  el.value!.innerHTML = props.value;
});

watch(
  () => props.value,
  (newValue, oldValue) => {
    console.log("newValue: ", newValue);
    console.log("oldValue: ", oldValue);
    if (el.value!.innerHTML !== newValue) el.value!.innerHTML = newValue;
  }
);

const exec = (command: string, value?: string) =>
  document.execCommand(command, false, value);

const queryCommandValue = (command: string) =>
  document.queryCommandValue(command);

const handleInput = (e: InputEvent | KeyboardEvent) => {
  const { firstChild } = e.target as HTMLElement;

  if (firstChild && firstChild.nodeType === 3) exec("formatBlock", "<p>");
  else if (el.value!.innerHTML === "<br>") el.value!.innerHTML = "";

  emit("input", el.value!.innerHTML);
};
const handleDelayedInput = (e: KeyboardEvent) => {
  nextTick(() => handleInput(e));
};
const handleKeydown = (e: KeyboardEvent) => {
  console.log("e: ", e);
  if (
    e.key.toLowerCase() === "enter" &&
    queryCommandValue("formatBlock") === "blockquote"
  ) {
    nextTick(() => exec("formatBlock", "<p>"));
  } else if (e.ctrlKey) {
    switch (e.key.toLowerCase()) {
      case "b":
        e.preventDefault();
        nextTick(() => exec("bold"));
        break;

      case "i":
        e.preventDefault();
        nextTick(() => exec("italic"));
        break;

      case "u":
        e.preventDefault();
        nextTick(() => exec("underline"));
        break;

      default:
        break;
    }
  }
};
</script>

<template>
  <div
    class="border p-1"
    ref="el"
    contenteditable
    @input="handleInput"
    @keydown="handleKeydown"
  />
</template>

<style></style>
