import ExpressApp from './server'

const PORT = 3000
async function startServer() {
  ExpressApp.listen(PORT, () => {
    console.log(`🚀 Server ready`);
  })
}

try {
  startServer()
} catch (err) {
  console.log({ err })
}
