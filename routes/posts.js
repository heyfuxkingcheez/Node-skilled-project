const express = require("express");
const router = express.Router();
const { Users, Posts, sequelize } = require("../models");
const authmiddleware = require("../middlewares/auth_middleware");
const { Op } = require("sequelize");
const url = require("url");

const {
    PostNotExistError,
    PostsNotExistError,
    CantSortError,
    NotMatchedIdError,
    ValidationError,
} = require("../lib/CustomError");
const { postSchemaValidation } = require("../lib/joi-validation");

// 상품 등록 API
router.post("/posts", authmiddleware, async (req, res, next) => {
    const { userId } = res.locals.user;
    try {
        const { title, content, price } = await postSchemaValidation.validateAsync(req.body);

        await Posts.create({
            UserId: userId,
            title,
            content,
            price,
        });
        return res.status(200).json({ message: "판매 상품을 등록하였습니다." });
    } catch (err) {
        next(err);
    }
});

// 상품 목록 조회 API
router.get("/posts", async (req, res, next) => {
    let querySTR = req.query.sort;

    try {
        let val = "desc";
        if (querySTR === "desc" || querySTR === undefined) {
            val;
        } else if (querySTR === "asc" || querySTR === null) {
            val = "asc";
        } else {
            const err = new CantSortError();
            throw err;
        }

        const allPosts = await Posts.findAll({
            attributes: [
                "productId",
                "title",
                "status",
                "price",
                "createdAt",
                "updatedAt",
                [sequelize.col("nickname"), "nickname"],
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
            ],
            order: [["createdAt", val]],
        });
        // 게시글들이 존재하지 않을 때
        if (allPosts.length === 0) {
            const err = new PostsNotExistError();
            throw err;
        }
        return res.status(200).json(allPosts);
    } catch (err) {
        next(err);
    }
});

// 상품 상세 조회 API
router.get("/post/:productid", async (req, res, next) => {
    const productid = req.params.productid;
    try {
        const postOne = await Posts.findOne({
            attributes: [
                "productId",
                "title",
                "content",
                "status",
                "price",
                "createdAt",
                "updatedAt",
                [sequelize.col("nickname"), "nickname"],
            ],
            include: [
                {
                    model: Users,
                    attributes: [],
                },
            ],

            where: { productid },
        });
        // 게시글이 존재하지 않을 때
        if (!postOne) {
            const err = new PostNotExistError();
            throw err;
        }
        return res.status(200).json(postOne);
    } catch (err) {
        next(err);
    }
});

// 상품 수정 API
router.put("/post/:productid", authmiddleware, async (req, res, next) => {
    const productid = req.params.productid;
    const { userId } = res.locals.user;
    const postOne = await Posts.findOne({ where: { productid } });
    try {
        const { title, content, status, price } = await postSchemaValidation.validateAsync(req.body);
        if (!postOne) {
            const err = new PostNotExistError();
            throw err;
        } else if (postOne.UserId !== userId) {
            const err = new NotMatchedIdError();
            throw err;
        } else {
            const insertOne = {
                title,
                content,
                status,
                price,
            };
            await Posts.update(insertOne, {
                where: { [Op.and]: [{ productid }, { UserId: userId }] },
            });
            res.status(200).send({ message: "상품 정보 수정 완료" });
        }
    } catch (err) {
        next(err);
        // return res.status(400).send({ errorMessage: "상품 조회에 실패하였습니다." });
    }
});

// 상품 삭제 API
router.delete("/post/:productid", authmiddleware, async (req, res, next) => {
    try {
        const productid = req.params.productid;
        const postOne = await Posts.findOne({ where: { productid } });
        const { userId } = res.locals.user;

        if (postOne.UserId !== userId) {
            const err = new NotMatchedIdError();
            throw err;
        } else {
            await Posts.destroy({
                where: { [Op.and]: [{ productid }, { UserId: userId }] },
            });
            res.status(200).send({ message: "상품을 삭제하였습니다." });
        }
    } catch (err) {
        next(err);
    }
});
module.exports = router;
