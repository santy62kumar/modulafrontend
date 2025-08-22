
import React, { useEffect, useId, useRef, useState } from "react";

export default function Select({
  name,
  value,
  onChange,            // (val: string) => void
  options,             // [{ value: string, label: string }]
  placeholder = "Select an option",
  error = null,
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const btnRef = useRef(null);
  const listRef = useRef(null);
  const uid = useId();

  const selected = options?.find((o) => o.value === value) || null;

  // Close when clicking outside
  useEffect(() => {
    const onDown = (e) => {
      if (
        open &&
        !btnRef.current?.contains(e.target) &&
        !listRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", onDown);
    return () => window.removeEventListener("mousedown", onDown);
  }, [open]);

  const move = (dir) => {
    const count = options?.length || 0;
    if (!count) return;
    const start = activeIndex === -1 ? (dir === 1 ? 0 : count - 1) : activeIndex + dir;
    const next = (start + count) % count;
    setActiveIndex(next);
  };

  const commit = (idx) => {
    const opt = options?.[idx];
    if (opt) {
      onChange(opt.value);
      setOpen(false);
      btnRef.current?.focus();
    }
  };

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        id={`select-btn-${uid}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`listbox-${uid}`}
        name={name}
        className={`w-full px-4 py-3 border border-[#D7C5AA] rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-[#AF7C71] focus:border-transparent
                    text-left font-nunito bg-white`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); move(1); }
          if (e.key === "ArrowUp")   { e.preventDefault(); setOpen(true); move(-1); }
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((o) => !o); }
          if (e.key === "Escape") setOpen(false);
        }}
      >
        <span className={selected ? "text-[#3A1A1A]" : "text-gray-500"}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">▾</span>
      </button>

      {open && (
        <ul
          ref={listRef}
          id={`listbox-${uid}`}
          role="listbox"
          aria-labelledby={`select-btn-${uid}`}
          tabIndex={-1}
          className="absolute z-50 mt-2 w-full max-h-60 overflow-auto rounded-lg border border-[#D7C5AA] bg-white shadow-lg"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
            if (e.key === "ArrowUp")   { e.preventDefault(); move(-1); }
            if (e.key === "Enter")     { e.preventDefault(); commit(activeIndex === -1 ? 0 : activeIndex); }
            if (e.key === "Escape")    setOpen(false);
          }}
        >
          {options?.map((opt, idx) => {
            const isSelected = value === opt.value;
            const isActive = idx === activeIndex;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                className={`cursor-pointer px-4 py-2 font-nunito
                            ${isActive || isSelected ? "bg-[#AF7C71] text-white" : "text-[#3A1A1A]"}
                            ${idx === 0 ? "rounded-t-lg" : ""} ${idx === options.length - 1 ? "rounded-b-lg" : ""}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseDown={(e) => e.preventDefault()} // keep focus while clicking
                onClick={() => commit(idx)}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}

      {error && <p className="mt-1 text-sm text-red-500 font-nunito">{error}</p>}
    </div>
  );
}
