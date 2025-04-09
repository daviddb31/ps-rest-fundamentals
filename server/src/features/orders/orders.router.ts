import express from "express";
import { getOrderDetail, getOrders } from "./orders.service";

export const ordersRouter = express.Router();

ordersRouter.get("/", async (req, res) => {
    const query = req.query;
    const take = query.take;
    const skip = query.skip;

    if (
        take &&
        typeof take === "string" &&
        parseInt(take) > 0 &&
        skip &&
        typeof skip === "string" &&
        parseInt(skip) > -1 
    ) {
    const orders = await getOrders(parseInt(skip), parseInt(take));
    res.json(orders);
    } else {
        res.status(400).json({
            message:
            "Take and skip query parameters are required. " +
            "Take must be greater than 0 and skip must be greater than -1",
        });
    }
});

ordersRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const order = await getOrderDetail(id);
    if (order != null) {
        res.json(order);
    } else {
        res.status(404).json({message: "Order Not Found"});
    }
});
