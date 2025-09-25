/**
 * Download an array of objects as a CSV file.
 *
 * @param data     Array of records (all objects should have the same set of keys).
 * @param fileName Base name for the downloaded .csv file (no extension).
 */
export function downloadDataAsCsv<T extends Record<string, unknown>>(
  data: T[],
  fileName: string
): void {
  if (!Array.isArray(data) || data.length === 0) {
    console.warn('No data to download');
    return;
  }

  // 1. Extract headers (object keys) from the first record
  const headers: string[] = Object.keys(data[0]);

  // 2. Build CSV rows
  const csvRows: string[] = [
    // Header row
    headers.join(',')
  ];

  // 3. Data rows
  for (const row of data) {
    const values = headers.map((header) => {
      const raw = row[header as keyof T];
      let val = raw == null ? '' : String(raw);

      // Escape double‑quotes by doubling them
      val = val.replace(/"/g, '""');
      // Wrap in double‑quotes in case of commas/newlines
      return `"${val}"`;
    });
    csvRows.push(values.join(','));
  }

  // 4. Combine into a single string (with BOM for Excel compatibility)
  const csvString = '\uFEFF' + csvRows.join('\r\n');

  // 5. Create a Blob and trigger download
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  // save csv
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  
}
