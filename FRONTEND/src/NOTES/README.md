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

creamos el create y detail page.

luego vemos como modifiamos los comandos para hacer el deploy, en la ultima parte del video
--------------------------------------------------------------------------------------------
si ya teniamos hecho el git, de ambos, vamos a pulirlo:

pasamos el gitignore a la carpeta raiz y verificamos que este el .env
hacemos un git init, git add ., git commit -m "first commit"
creamos el repo en github y pusheamos el repo local
en la raiz, creamos un package.json con el comando npm init -y
en el package.json agregamos:
"scripts": {
    "build": "npm install --prefix BACKEND && npm install --prefix FRONTEND",
  },

luego borramos las carpetas node_modules de ambos proyectos
corremos en raiz npm run build

modificamos el archivo package.json de la carpeta raiz
"scripts": {
    "build": "npm install --prefix BACKEND && npm install --prefix FRONTEND && npm run build --prefix FRONTEND",
  },

  luego de que todo este solucionado con errores de ts y demas, 
  nos arrojara un /dist en el FRONTEND listo para produccion

  ahora juntaremos el front cuyo dominio es localhost:5173 con el back cuyo dominio es localhost:5001
  meteremos el front en el back

  modificaremos el server.js del backend, para que corra el frontend
  ...
  if (process.env.NODE_ENV !== "production") {
    app.use(
      cors({
        origin: ["http://localhost:5173"],
      })
    )
  }
  ...

  if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../FRONTEND/dist")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../FRONTEND/dist/index.html"))
  })
}

agregamos en el .env del backend:
NODE_ENV=production

agregamos a pack  age.json del backend:
"scripts": {
    "build": "npm install --prefix BACKEND && npm install --prefix FRONTEND && npm run build --prefix FRONTEND",
    "start": "npm run start --prefix BACKEND",
  },

corregimos el rest-api.ts
const baseUrl = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"

volvemos a corregir
NODE_ENV=development para subirlo a github, y porque en versel, no se va a usar esta variable




