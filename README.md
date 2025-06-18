# Tauri Camera Plugin

This project is a Tauri plugin that allows Tauri applications to access the Android camera for taking pictures and recording videos. It exposes APIs in both Rust and TypeScript, enabling seamless integration with Tauri apps.

## Features

- Access the device camera to take pictures and record videos.
- Expose Rust APIs that act as a proxy to the Kotlin camera implementation.
- Provide TypeScript APIs for easy interaction within Tauri applications.

## Examples

See an example in the folder `examples/camera-app`.

## Project Structure

- **android/src**: Contains the Android-specific implementation of the camera plugin.
  - **main/java**: Contains the main classes for the camera plugin.
    - `CameraPlugin.kt`: Entry point for the Tauri plugin on Android.
    - `CameraHandler.kt`: Manages camera operations and file references.

- **guest-js/index.ts**: TypeScript APIs for interacting with the camera plugin.


## Installation

Install it adding both the cargo and the javascript versions as dependencies:

```bash
cargo add tauri-plugin-camera
npm i --save tauri-plugin-camera
```

After that, initialize the plugin on your tauri's run() function (usually lib.rs or main.rs):

```rust
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // add the following line:
        .plugin(tauri_plugin_camera::init())

        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```


## Usage

### TypeScript API

```typescript
import { takePicture, recordVideo } from "tauri-plugin-camera";

takePicture().then(pictureResponse => {
  // imageData is the base64 encoded image 
  const {imageData, width, height} = pictureResponse;
});

recordVideo().then(videoResponse => {
  // videoData is the base64 encoded video
  const {videoData, width, height} = videoResponse;
})
```

### Rust API

```rust
use tauri_plugin_camera::{CameraExt, TakePictureResponse};

#[tauri::command]
fn take_picture(app: AppHandle) -> TakePictureResponse {
    // Call the camera plugin to take a picture
    let response = app.camera().take_picture().unwrap();
    dbg!("Response: {:?}", &response);
    // response.imageData is the base64 encoded image
    response
}
```

## Building

To build the javascript files, enter the project root and type: 
```bash
rollup -c
```
