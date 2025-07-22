https://www.youtube.com/watch?v=Ea9rrRj9e0Y&list=LL&t=1654s

Creamos 2 carpetas "Frontend" y "Backend"
en terminal "cd backend"
"npm init -y" para crear el package.json
"npm i express@4.18.2"
"npm i nodemon -D" si es que no lo tenemos
creamos "server.js" punto de arranque
en package.json creamos:
  "scripts": {
    "dev": "nodemon server.js"
  },
  "type": "module",

refactorizamos lo que va en routes y en controllers
y hacemos carpeta src
modificamos el package.json para que:
  "main": "src/server.js",
  "dev": "nodemon src/server.js"

MONGODB
new proyect
create cluster
free plan + create deployment
copy password + create database user + choose a connection method
choose conection method + drivers

copiar el string de coneccion + done

network acces + add ip address + allow access from anywhere + confrim

npm i mongoose dotenv
creamos .env  con MONGODB_URI
agregamos el nombre de la tabla en la string de MONGODB_URI, antes de .../<nombre_tabla>?retry...

creamos src/config/db.js

creamos el modelo Note en src/models/Note.js

actualizamos los controllers

usamos postman / insomnia para testear

o usar rest-client y creamos el archivo rest-client.http
(le damos click al "send request" para probar)

hagamos el rate limit
-----------------------
loguearse en upstash.com
el servicio es Redis  => "create database +"
una vez creada, te vas a connect
copiamos las env variables:
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN

luego bun add @upstash/redis @upstash/ratelimit

creamos src/config/upstash.js
------------------------------

import RateLimit from "@upstash/ratelimit"
import Redis from "@upstash/redis"
import dotenv from "dotenv"

dotenv.config()

//create reatelimiter that allows 100 requests per minute
const rateLimiter = new RateLimiter({
  redis: Redis.fromEnv(),
  limiter: RateLimit.slidingWindow(100, "60 s"),
})

export default rateLimiter

creamos src/middleware/rateLimiter.js
--------------------------------------

import rateLimiter from "../config/upstash.js"

const rateLimiter = (req, res, next) => {
  try {
    const { success } = await rateLimiter.limit("my-rate-limit")
    if (!success) {
      return res.status(429).json({ message: "Too many requests, try again later" })
    }
    next()
  } catch (error) {
    console.error("Error en rateLimiter", error.message)
    next(error)
  }
}

export default rateLimiter

en src/server.js agregamos:
---------------------------
...
app.use(express.json())
app.use(rateLimiter)
...


=======================================================
            FIN BACKEND
=======================================================            

conectamos con el front end

npm i cors

en server.js coloco
import cors from "cors"
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
)





