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
    radial-gradient(circle at top, rgba(124, 58, 237, 0.12), transparent 30%),
    linear-gradient(180deg, #f7f7fb 0%, #eef2ff 100%);
  color: #0f172a;
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

img {
  max-width: 100%;
  display: block;
}

button,
a {
  transition: all 0.2s ease;
}
