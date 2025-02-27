export function downloadObjectAsJson(object: any, fileName: string): void {
  // 1. Convert the object to a JSON string
  const jsonStr = JSON.stringify(object, null, 2);

  // 2. Create a temporary anchor element
  const anchor = document.createElement('a');
  
  // 3. Encode the JSON string and set it as the download URL
  // Set MIME type as 'text/json' and character encoding as 'utf-8'
  anchor.setAttribute(
    'href', 
    'data:text/json;charset=utf-8,' + encodeURIComponent(jsonStr)
  );

  // 4. Set the desired file name
  anchor.setAttribute('download', fileName + '.json');

  // 5. Append the anchor to the body (required for Firefox)
  document.body.appendChild(anchor);
  
  // 6. Trigger the download
  anchor.click();
  
  // 7. Remove the anchor from the DOM
  document.body.removeChild(anchor);
}
