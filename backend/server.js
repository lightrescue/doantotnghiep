import "dotenv/config";
import express from "express";
import cors from "cors";

import { authOptional } from "./src/middleware/auth.js";
import { notFound, errorHandler } from "./src/middleware/error.js";
import { runMigrations } from "./src/config/migrations.js";

import authRoutes from "./src/routes/authRoute.js";
import usersRoutes from "./src/routes/usersRoute.js";
import productsRoutes from "./src/routes/productsRoute.js";
import categoriesRoutes from "./src/routes/categoriesRoute.js";
import brandsRoutes from "./src/routes/brandsRoute.js";
import ordersRoutes from "./src/routes/ordersRoute.js";
import reviewsRoutes from "./src/routes/reviewsRoute.js";
import vouchersRoutes from "./src/routes/vouchersRoute.js";
import uploadsRoutes from "./src/routes/uploadsRoute.js";
import chatbotRoutes from "./src/routes/chatbotRoute.js";
import statsRoutes from "./src/routes/statsRoute.js";
import inventoryRoutes from "./src/routes/inventoryRoute.js";
import paymentRoutes from "./src/routes/paymentRoute.js";

const app = express();

app.use(
    cors({
        origin: (process.env.CORS_ORIGIN || "http://localhost:5173").split(","),
        credentials: true,
    })
);
app.use(express.json({ limit: "5mb" }));
app.use(authOptional);

app.get("/api/health", (_req, res) =>
    res.json({ ok: true, time: new Date().toISOString() })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/brands", brandsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/vouchers", vouchersRoutes);
app.use("/api/uploads", uploadsRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/payment", paymentRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 4000;
runMigrations()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`[viqitech] API running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("[viqitech] Migration thất bại, không thể start server:", err.message);
        process.exit(1);
    });
