import image from './noface_img.png'

async function imageUrlToFile(imageUrl: string, filename: string): Promise<File> {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const file = new File([blob], filename, { type: blob.type });
  return file;
}

export const nofaceImage = await imageUrlToFile(image, './noface_img.png');