"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";

const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "<p>Hello World!</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
      },
    },
  });
  return (
    <div className="">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
