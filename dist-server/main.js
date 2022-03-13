"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const MongoStore = require('connect-mongo');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI
        }),
        cookie: { maxAge: 3600000 },
    }));
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map