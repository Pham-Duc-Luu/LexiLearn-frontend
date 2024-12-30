import React from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HeaderStyle from "./Header.module.scss";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import "./Header.css";
const DescriptionEditor = () => {
  const descriptionEditor = useEditor({
    extensions: [
      StarterKit,
      Text,
      Placeholder.configure({
        // Use a placeholder:
        // Use different placeholders depending on the node type:
        placeholder: ({ node }) => {
          return "Enter your description here...";
        },
      }),
    ],
    content: "", // Initial empty content
    onUpdate: ({ editor }) => {
      // Truncate content if there's more than one line
      const content = editor.getText();
      const truncatedContent = content.split("\n")[0]; // Only take the first line
      if (content !== truncatedContent) {
        editor.commands.setContent(truncatedContent);
      }
    },
  });
  return (
    <>
      <EditorContent editor={descriptionEditor}></EditorContent>
    </>
  );
};

export default DescriptionEditor;
