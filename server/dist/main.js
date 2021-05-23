"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    let origin = 'http://localhost:3000';
    if (process.env.NODE_ENV === 'production') {
        origin = 'http://escarnews.herokuapp.com';
    }
    app.enableCors({ origin, credentials: true });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.use(cookieParser());
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map