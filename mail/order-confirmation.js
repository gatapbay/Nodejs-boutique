const nodemailer = require('nodemailer');
const setup = require('../config');


const transporter = nodemailer.createTransport({
    host: setup.NODEMAILER_HOST,
    port: setup.NODEMAILER_PORT,
    secure: true,
    auth: {
        user: setup.NODEMAILER_USER,
        pass: setup.NODEMAILER_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = (orders) => {
    let report = '';
    orders.products.forEach(el => {
        report += `<tr style="height: 30px">
            <td style="text-align: left;padding-left: 20px;">${el.product.name}</td>
            <td>${el.product.price.toLocaleString()} VNĐ</td>
            <td>${el.amount}</td>
            <td>${el.product.price * el.amount} VNĐ</td>
        </tr>`;
    });
    const content = `
    <div style="background-color:white">
        <div style="padding:10px 0px; color: #000">
            <h3>Xin chào, ${orders.fullname}</h3>
            <p>Phone: ${orders.phone}</p>
            <p>Address: ${orders.address}</p>
            <hr style="opacity: 0.75;"/>
            <table style="width: 100%;text-align: center;border: 1px solid #eee; margin: 30px 0">
                <thead style="border-bottom: 1px solid #eee;background: #eee;">
                    <tr style="height: 35px">
                        <th>Tên sản phẩm</th><th>Giá</th><th>Số lượng</th><th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>${report}</tbody>
            </table>
            <h4 style="margin-bottom: 30px; text-align: right;">Tổng thanh toán: ${orders.totalPrice.toLocaleString()} VNĐ</h4>
            <hr style="opacity: 0.75;"/>
            <h4>Cảm ơn bạn!</h4>
        </div>
    </div>
    `;
    if (setup.ORDERS_CONFIRM_MAIL) transporter.sendMail({
        from: 'Boutique',
        to: orders.userId.email,
        subject: 'Xác nhận đơn hàng',
        html: content
    }, e => e ? false : true);
};