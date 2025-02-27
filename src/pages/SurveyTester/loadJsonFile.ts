/**
 * A function to open a JSON file picker, parse the file,
 * and pass the parsed data to a callback.
 *
 * @param onDataLoad - A callback function that receives
 *                    the parsed JSON data if successful.
 * @returns A Promise that resolves when the file is successfully read
 *          and the callback is called, or rejects on error.
 */
export function loadJsonFile(onDataLoad: (data: any) => void): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    // 1. Create a hidden <input type="file"> element for JSON files
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/json';

    // 2. Listen for user file selection
    fileInput.onchange = () => {
      try {
        const files = fileInput.files;
        if (!files || files.length === 0) {
          throw new Error('No file selected.');
        }

        const file = files[0];
        const reader = new FileReader();

        reader.onload = () => {
          try {
            const content = reader.result;
            if (!content) {
              throw new Error('File reading failed or file is empty.');
            }

            // 3. Parse the JSON
            const parsedData = JSON.parse(content.toString());

            // 4. Pass the parsed data to the callback
            onDataLoad(parsedData);

            // Resolve the Promise
            resolve();
          } catch (err) {
            reject(err);
          }
        };

        reader.onerror = () => {
          reject(new Error('Error reading the file.'));
        };

        // Read the file as text
        reader.readAsText(file);
      } catch (err) {
        reject(err);
      }
    };

    // 5. Programmatically click the input to open the file chooser
    fileInput.click();
  });
}
