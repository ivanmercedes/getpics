# 📸 getpics

**Fast & Easy Website Image Downloader**

Get all images from any public website with a single command.  
Lightweight, simple, and powered by Node.js.

---

## 🛠️ Usage

Once installed, simply run:

```bash
npx getpics --url=https://example.com --dir=your_directory_name
```

### 🔹 Parameters:

- `--url`: URL of the website to download images from. (**Required**)
- `--dir`: Name of the directory where the images will be saved. It will be created if it doesn't exist. (**Required**)

---

## 📋 Example

```bash
npx getpics --url="https://mywebsite.com" --dir="website_images"
```

This will download all images from `https://mywebsite.com` into the `website_images/` folder.

---

## 🛑 Important Notes

- Supports common image extensions: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.bmp`.
- If an image doesn't have a recognized extension, it will default to `.jpg`.
- Images are saved with sequential filenames like `1.jpg`, `2.jpg`, `3.jpg`, etc.
- Works by scanning all `<img>` tags and extracting their `src` attributes.

---

## 📦 Dependencies

- [axios](https://www.npmjs.com/package/axios) – HTTP requests.
- [jsdom](https://www.npmjs.com/package/jsdom) – Parse and manipulate HTML content.

These dependencies are automatically installed when you run `npm install`.

---

## 🤝 Contributions

Contributions are welcome!  
Feel free to open an issue or submit a pull request if you have suggestions, bug reports, or improvements.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
