npm create vite@latest
bun add react-router react-hot-toast
tailwindcss 4
=========================
npm install tailwindcss @tailwindcss/vite
en vite.config.ts
  import { defineConfig } from 'vite'
  import tailwindcss from '@tailwindcss/vite'
  export default defineConfig({  plugins: [    tailwindcss(),  ],})

en index.css    @import "tailwindcss";

si te salta un error    
Delete the postcss.config.js file
And then npm i -d @tailwindcss/vite, 
change the vite.config.ts file
...
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(async () => ({
  plugins: [
    react(),
    tailwindcss(),
  ],
...
...
then add @import "tailwindcss"; in your css file

===========================
crear las rutas en App.tsx y en main.tsx

creamos las paginas HomePage, DetailNotePage y CreateNotePage

en HomePage listamos las notas que traemos del BACKEND "http://localhost:5001/api/notes"

instalamos el cors en el backend para permitir acceso de distinto dominio





