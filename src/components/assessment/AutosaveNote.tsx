interface AutosaveNoteProps {
  label: string;
}

export function AutosaveNote({ label }: AutosaveNoteProps) {
  return <p className="text-center text-sm font-semibold text-[#5f646b] lg:text-[1rem]">{label}</p>;
}
