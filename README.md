## ASSIGNMENT 03 - WEBSITE THƯƠNG MẠI ĐIỆN TỬ
- Author: Phạm Quang Hoàn

### SERVER:
- Database: Mongoose Database
- Đây là server API nội bộ, chưa có phiên bản API cho các nhà phát triển của bên thứ ba

### Hướng dẫn cài đặt
- Import toàn bộ data trong thư mục data vào Mongo Database
- Thiết lập lại file ./config.js
- Chạy lệnh trên thư mục Backend: npm install
- Chạy lệnh trên thư mục Backend: npm start

### API Map:

[POST]  /api/auth/regist

        Body Required: fullname, email, password


[POST]  /api/auth/login

        Body Required: email, password


[GET]   /api/admin/users

        Query Required: token
        Note: Token phải đại diện cho user có level >= 4


[POST]  /api/admin/update-user

        Body Required: fullname, level
        Query Required: token, id
        Note: Token phải đại diện cho user có level >= 4


[GET]   /api/admin/analitics

        Query Required: token
        Note: Token phải đại diện cho user có level >= 1


[GET]   /api/admin/products

        Query Required: token
        Note: Token phải đại diện cho user có level >= 1


[GET]   /api/admin/product

        Query Required: token
        Note: Token phải đại diện cho user có level >= 1


[POST]  /api/admin/add-product

        Query Required: token
        Body Required: Product Data
        Note: Token phải đại diện cho user có level >= 3


[POST]  /api/admin/update-product

        Query Required: token, id
        Body Required: Product Data
        Note: Token phải đại diện cho user có level >= 3


[DELETE]/api/admin/delete-product

        Query Required: token, id
        Note: Token phải đại diện cho user có level >= 3


[GET]   /api/admin/orders

        Query Required: token


[POST]  /api/admin/update-order

        Query Required: token
        Body Required: status
        Note: Token phải đại diện cho user có level >= 3


[GET]   /api/admin/supports

        Query Required: token
        Note: Token phải đại diện cho user có level >= 2


[POST]  /api/upload/image

        Query Required: token


[GET]   /api/products


[GET]   /api/product


[GET]   /api/orders

        Query Required: token


[POST]  /api/orders

        Query Required: token
        Body Required: Orders Data


[GET]   /api/support

        Query Required: id
