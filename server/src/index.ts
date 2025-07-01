import app from "./app";
// vite is only in the client dependencies right now..
// import ViteExpress from 'vite-express'
const PORT = 5000

// ViteExpress.listen(app, PORT, () => {
//   console.log(`Server listening at http://localhost:${PORT}/api...`);
// })
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/api...`);
})
 