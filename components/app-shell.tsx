@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(124, 58, 237, 0.12), transparent 28%),
    radial-gradient(circle at bottom right, rgba(244, 114, 182, 0.12), transparent 28%),
    linear-gradient(180deg, #f6f7fb 0%, #eef2ff 100%);
  color: #0f172a;
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

img {
  display: block;
  max-width: 100%;
}

button,
a {
  transition: all 0.2s ease;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.7);
  border-radius: 9999px;
}

::-webkit-scrollbar-track {
  background: transparent;
}
