import { Component, signal } from "@angular/core";
import { invoke } from "@tauri-apps/api/core";
import { emit } from "@tauri-apps/api/event";
import { recordVideo, takePicture, RecordVideoResponse, TakePictureResponse } from "tauri-plugin-camera";


export interface PictureResponse {
  imageData: string;
    width: number;
    height: number;
}
export interface VideoResponse {
  videoData: string;
    width: number;
    height: number;
}


@Component({
    selector: "app-camera",
    imports: [],
    templateUrl: "./camera.component.html",
    styleUrl: "./camera.component.scss",
})
export class CameraComponent {
    takenVideo = signal<RecordVideoResponse | null>(null);
    takenPicture = signal<TakePictureResponse | null>(null);
    emptyReturn = false;

    async recordVideo() {
        console.log("Taking Video...");
        try {
            this.takenVideo.set(null);
            const response = await recordVideo();
            console.log("Video taken from Câmera:", response);
            emit("videoRecorded", { url: response });
            this.takenVideo.set(response as RecordVideoResponse);
        } catch (error) {
            console.error("Error recording video:", error);
            this.emptyReturn = true;
        }
    }

    async takePicture() {
        console.log("Taking picture...");
        try {
            this.takenPicture.set(null);
            const response = await takePicture();
            console.log("Picture taken from Câmera:", response);
            emit("pictureTaken", { url: response });
            this.takenPicture.set(response as TakePictureResponse);
        } catch (error) {
            console.error("Error taking picture:", error);
            this.emptyReturn = true;
        }
    }

    async takePictureRust() {
        try {
            this.takenPicture.set(null);
            const response = await invoke("take_picture");
            console.log("Picture taken from Câmera:", response);
            emit("pictureTaken", { url: response });
            this.takenPicture.set(response as TakePictureResponse);
        } catch (error) {
            console.error("Error taking picture:", error);
            this.emptyReturn = true;
        }
    }
}
