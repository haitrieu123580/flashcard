"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// import 'module-alias/register';
const module_alias_1 = __importDefault(require("module-alias"));
console.log(__dirname);
module_alias_1.default.addAliases({
    "@src": `${__dirname}/`,
    "@routers": `${__dirname}/routers`,
    "@controllers": `${__dirname}/controllers`,
    "@services": `${__dirname}/services`,
    "@repositories": `${__dirname}/repositories`,
    "@middleware": `${__dirname}/middleware`,
    "@entity": `${__dirname}/entity`,
    "@dto": `${__dirname}/dto`,
    "@helper": `${__dirname}/helper`,
});
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
require("./services/oauth/Passport");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yaml_1 = __importDefault(require("yaml"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const data_source_1 = require("./data-source");
const index_1 = __importDefault(require("@routers/auth/index"));
const index_2 = __importDefault(require("@routers/user/index"));
const index_3 = __importDefault(require("@routers/passport/index"));
const index_4 = __importDefault(require("@routers/vocabulary-set/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Database connection
const connectToDatabase = async () => {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log("Database connection established successfully.");
    }
    catch (error) {
        console.log(error);
        console.log("Retrying connection in 5 seconds...");
        setTimeout(connectToDatabase, 5000);
    }
};
connectToDatabase();
// Swagger
try {
    const file = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../docs/swagger.yaml'), 'utf8');
    const swaggerDocument = yaml_1.default.parse(file);
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
}
catch (error) {
}
// Passport
app.use((0, express_session_1.default)({
    secret: String(process.env.SESSION_KEY),
    resave: false,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/auth', index_1.default);
app.use('/api/user', index_2.default);
app.use('/passport', index_3.default);
app.use('/api/vocabulary-set', index_4.default);
const port = process.env.PORT || 8000;
app.listen(Number(port), "0.0.0.0", () => {
    console.log(`server is running on http://localhost:${process.env.PORT || 8000}`);
});
app.get('/', (req, res) => {
    res.send('Server is running');
});
