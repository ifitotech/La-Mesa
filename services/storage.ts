import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { storage } from "@/lib/firebase";

export async function uploadProfilePhoto(
  uid: string,
  file: File
): Promise<string> {
  const extension =
    file.name.split(".").pop()?.toLowerCase() || "jpg";

  const storageRef = ref(
    storage,
    `profilePhotos/${uid}/profile.${extension}`
  );

  await uploadBytes(storageRef, file);

  return await getDownloadURL(storageRef);
}

export async function deleteProfilePhoto(
  uid: string
) {
  const storageRef = ref(
    storage,
    `profilePhotos/${uid}/profile.jpg`
  );

  try {
    await deleteObject(storageRef);
  } catch {
    // Si el archivo no existe, simplemente continuamos.
  }
}