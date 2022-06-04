import { defineStore } from "pinia";
import { reactive } from "vue";
import { exec } from "@/utils/editor-utils";

export type TextType = "bold" | "italic" | "underline";

export const useEditorHeader = defineStore("editorHeader", () => {
  const textType = reactive(new Set());

  function setTextType(type: TextType) {
    if (!type) return;

    exec(type);

    if (!textType.has(type)) {
      textType.add(type);
    } else {
      textType.delete(type);
    }
  }

  return { textType, setTextType };
});
