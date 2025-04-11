# 🖌️ React Fabric Image Editor

A simple image editing tool built using **React** and **Fabric.js**. Users can upload or search for an image, add shapes or captions, and download the final edited result as a PNG.

---

## 🚀 Features

- 🔍 Search images using Pixabay API or upload from local device
- Add shapes: ✅ Circle, ✅ Rectangle, ✅ Triangle, ✅ Polygon
- Add custom text captions with `fabric.Textbox`
- Move, resize, and freely edit elements using the Fabric.js canvas
- Download the edited image as a PNG file

---

## 🧱 Tech Stack

- **React**
- **React Router**
- **Fabric.js** (v5)
- **Pixabay API** (for image search)

---

## 🛠️ How It Works

1. Users land on the **Home Page**:
   - Enter a search term to fetch images via Pixabay API
   - Or upload a local image file
2. After selection, users are navigated to the **Editor Page**
3. The selected image loads onto a Fabric.js canvas
   - With proper `crossOrigin: 'anonymous'` handling to avoid CORS errors
4. Users can:
   - Add captions
   - Add shapes (circle, rectangle, triangle, polygon)
   - Edit, drag, resize, and layer elements freely
5. Click **Download** to save the final canvas as a PNG

---

## 📁 Project Structure

