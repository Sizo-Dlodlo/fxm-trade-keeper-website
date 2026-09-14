export function csvCell(value: unknown): string {
  const raw =
    value === null || value === undefined ? "" : String(value);
  if (/[",\r\n]/.test(raw)) {
    return '"' + raw.replace(/"/g, '""') + '"';
  }
  return raw;
}

export function buildCsv(
  headers: string[],
  rows: (string | number | boolean | null)[][]
): string {
  const lines = [headers, ...rows].map((row) =>
    row.map((cell) => csvCell(cell)).join(",")
  );
  return "\ufeff" + lines.join("\r\n");
}

export function toLocalDate(value: Date | string): string {
  const d = new Date(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export function csvFilename(base: string): string {
  const date = new Date().toISOString().slice(0, 10);
  return `${base}-${date}.csv`;
}