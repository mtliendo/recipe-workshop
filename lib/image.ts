export function fileToPlatePhoto(file: File) {
  return new Promise<string>((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Choose a picture."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("That picture couldn't be read."));
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const max = 960;
        const scale = Math.min(1, max / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("This browser couldn't prepare the picture."));
          return;
        }
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.onerror = () => reject(new Error("That picture couldn't be read."));
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
