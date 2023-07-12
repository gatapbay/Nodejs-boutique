module.exports = Object.freeze({
    // DATABASE
    MONGODB_CONNECT: '',

    // JWT Setup
    JWT_SECURITY_KEY: 'gatapbay',
    JWT_TOKEN_EXPIRES: '30d',

    // PERMISSION 1 - 5
    USERS_MANAGER_LEVEL: 4,
    PRODUCTS_MANAGER_LEVEL: 3,
    SUPPORT_LEVEL: 2,
    ORDER_MANAGER_LEVEL: 3,

    // NODE MAILER
    ORDERS_CONFIRM_MAIL: false,
    NODEMAILER_HOST: 'smtp.gmail.com',
    NODEMAILER_PORT: 465,
    NODEMAILER_USER: '',
    NODEMAILER_PASS: ''
});