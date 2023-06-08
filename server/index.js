const app = require("./app")
const { syncAndSeed } = require("./db")
const { testStripe } = require("./services/stripe")

const init = async () => {
  try {
    await syncAndSeed()
    const customers = await testStripe();
    console.log(customers, "TOTAL CUSTOMERS | STRIPE TEST")
    const port = process.env.PORT || 3000
    app.listen(port, () => console.log(`listening on port ${port}`))
  } catch (ex) {
    console.log(ex)
  }
}

init()
