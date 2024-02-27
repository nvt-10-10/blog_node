import ResponseHandler from "../utils/ResponseHandler.js";
class GenericService {
    constructor(model) {
        this.model = model;
    }

    async getAll(scope = null) {
        if (scope) {
            return await this.model.scope(scope).findAll();
        } else {
            return await this.model.findAll();
        }
    }

    async getById(id, scope = null) {
        if (scope) {
            return await this.model.scope(scope).findByPk(id);
        } else {
            return await this.model.findByPk(id);
        }
    }

    async create(data) {
        return this.model.create(data);
    }
    async update(id, newData, res) {
        const item = await this.getById(id);
        if (!item) {
            ResponseHandler.error(res, `${this.model.name} không tìm thấy`);
            throw new Error();
        } else {
            await item.update(newData);
            ResponseHandler.success(
                res,
                `${this.model.name} cập nhật thành công`
            );
        }
    }

    async delete(id, res) {
        try {
            const item = await this.getById(id);
            if (item == null) {
                ResponseHandler.error(res, `${this.model.name} không tìm thấy`);
            } else {
                await item.destroy({
                    where: {
                        id: id,
                    },
                });
                ResponseHandler.success(
                    res,
                    `${this.model.name} đã xoá thành công`
                );
            }
        } catch (error) {
            ResponseHandler.error(res, "Xảy ra lỗi ở máy chủ");
        }
    }
}

export default GenericService;
