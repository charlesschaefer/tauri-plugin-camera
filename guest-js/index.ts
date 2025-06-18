import { invoke } from '@tauri-apps/api/core';


export interface TakePictureResponse {
  imageData: string;
  width: number;
  height: number;
}
export interface RecordVideoResponse {
  videoData: string;
  width: number;
  height: number;
}


export async function takePicture(): Promise<TakePictureResponse> {
  const response = await invoke('plugin:camera|take_picture');
  return response as TakePictureResponse;
}

export async function recordVideo(): Promise<RecordVideoResponse> {
  const response = await invoke('plugin:camera|record_video');
  return response as RecordVideoResponse;
}