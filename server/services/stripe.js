const stripe = require('stripe')(process.env.STRIPE_KEY);

const testStripe = async () => {
    //Test the connection to Stripe
    try {
        const test = await stripe.customers.list();
        const totalCustomers = test.data?.length;
        return totalCustomers;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}


const createStripeCustomer = async (email, name) => {
    //Create a new customer in Stripe
    try {
        const customer = await stripe.customers.create({
            email: email,
            name: name

        });
        return customer;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { testStripe, createStripeCustomer }