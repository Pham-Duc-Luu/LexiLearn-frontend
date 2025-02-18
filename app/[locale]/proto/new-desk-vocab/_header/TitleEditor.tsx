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
const TitleEditor = () => {
  const titleEditor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Placeholder.configure({
        // Use a placeholder:
        // Use different placeholders depending on the node type:
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Enter your title here...";
          }
          return "Enter your description here...";
        },
      }),
    ],

    content: "<h1></h1>", // Start with an empty heading
    onUpdate: ({ editor }) => {
      // Truncate content to a single line

      const content = editor.getText();
      console.log(content);
      const truncatedContent = content.split("\n")[0]; // Only take the first line
      if (!content) {
        editor.commands.setContent(`<h1></h1>`);
      }
      if (content !== truncatedContent) {
        editor.commands.setContent(`<h1>${truncatedContent}</h1>`);
      }
    },
    editable: true,
  });
  return (
    <>
      <EditorContent editor={titleEditor}></EditorContent>
    </>
  );
};

export default TitleEditor;
