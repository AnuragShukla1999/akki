// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}


// const API_URL: &str = "http://localhost:3000/api";

// #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// use reqwest::Client;
// use tauri::command;

// #[command]
// async fn fetch_data_from_express() -> Result<String, String> {
//     let client = Client::new();
//     let response = client
//         .get("https://akki-1ni7.onrender.com")
//         .send()
//         .await
//         .map_err(|e| format!("Request failed: {}", e))?
//         .text()
//         .await
//         .map_err(|e| format!("Failed to read response text: {}", e))?;
//     Ok(response)
// }

// #[tokio::main]
// async fn main() {
//     tauri::Builder::default()
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }
