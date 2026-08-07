"use client";
import React, { useState } from "react";
import Icon from "./icons";
import Button from "./Button";

export default function ReviewInput({
  onSubmit,
  placeholder = "답변을 입력해주세요...",
}: {
  onSubmit?: (text: string) => void;
  placeholder?: string;
}) {
  const [value, setValue] = useState("");
  return (
    <div className="flex items-start gap-2">
      <div className="flex-1 relative">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className="w-full resize-none rounded-lg border border-ink-200 bg-white text-sm px-3 py-2 pr-9 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
        />
        <Icon
          name="edit"
          className="w-4 h-4 text-ink-300 absolute right-3 top-2.5"
        />
      </div>
      <Button
        size="sm"
        onClick={() => {
          if (!value.trim()) return;
          onSubmit?.(value);
          setValue("");
        }}
      >
        등록
      </Button>
    </div>
  );
}
