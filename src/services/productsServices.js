const { Op } = require('sequelize');
const Product = require('../models/product');
const Image = require('../models/image');
const ProductOption = require('../models/product_options');
const ProductCategory = require('../models/category');
const ProductCategories = require('../models/product_categories');

const getProduct = async (req, res) => {
    try {
        const {
            limit = 30,
            page = 1,
            fields,
            match,
            category_ids,
            'price-range': priceRange,
            ...options
        } = req.query;

        // Configurar opções de busca
        const queryOptions = {
            attributes: fields ? fields.split(',') : undefined,
            where: {},
            include: [
                { model: Image, attributes: ['id', 'path'] }, // Inclua imagens
                { model: ProductOption, attributes: ['id', 'title', 'values'] }, // Inclua opções
                { model: ProductCategory, attributes: ['id'], through: { attributes: [] } } // Inclua categorias
            ],
            order: [['name', 'ASC']] // Ajuste a ordenação conforme necessário
        };

        console.log('Request Query:', req.query);

        // Filtrar produtos por nome ou descrição
        if (match) {
            queryOptions.where[Op.or] = [
                { name: { [Op.iLike]: `%${match}%` } },
                { description: { [Op.iLike]: `%${match}%` } }
            ];
        }

        // Filtrar por IDs de categorias
        if (category_ids) {
            const categoryIds = category_ids.split(',').map(id => parseInt(id, 10));
            queryOptions.include[2].where = { id: categoryIds }; // Filtra categorias
        }

        // Filtrar por faixa de preço
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split('-').map(price => parseFloat(price));
            queryOptions.where.price = { [Op.between]: [minPrice, maxPrice] };
        }

        // Filtrar por opções
        for (const [key, value] of Object.entries(options)) {
            if (key.startsWith('option[') && value) {
                const optionId = parseInt(key.match(/\d+/)[0], 10);
                const optionValues = value.split(',');
                queryOptions.include.push({
                    model: ProductOption,
                    where: {
                        id: optionId,
                        values: {
                            [Op.contains]: optionValues
                        }
                    },
                    required: true
                });
            }
        }

        // Configurar paginação
        let limitValue = parseInt(limit, 10);
        let pageValue = parseInt(page, 10);

        if (isNaN(limitValue) || limitValue === -1) {
            queryOptions.limit = undefined; // Buscar todos os itens
        } else {
            queryOptions.limit = limitValue;
            queryOptions.offset = (isNaN(pageValue) || pageValue < 1 ? 1 : pageValue - 1) * queryOptions.limit;
        }

        // Buscar produtos
        const products = await Product.findAll(queryOptions);

        console.log('Products:', products);

        // Total de produtos
        const totalProducts = await Product.count({
            where: queryOptions.where
        });

        // Formatar a resposta
        const formattedProducts = products.map(product => ({
            id: product.id,
            enabled: product.enabled,
            name: product.name,
            slug: product.slug,
            stock: product.stock,
            description: product.description,
            price: product.price,
            price_with_discount: product.price_with_discount,
            category_ids: product.product_categories.map(pc => pc.category_id),
            images: product.images.map(img => ({
                id: img.id,
                content: img.path // Verifique se o nome do campo é correto
            })),
            options: product.product_options.map(option => ({
                id: option.id,
                title: option.title,
                shape: option.shape,
                radius: option.radius,
                type: option.type,
                values: option.values.split(',')
            }))
        }));

        // Responder com produtos e informações de paginação
        res.status(200).json({
            data: formattedProducts,
            total: totalProducts,
            limit: limitValue,
            page: pageValue
        });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
    }
};


const getProductById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        // Buscar o produto pelo ID
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        // Buscar imagens do produto
        const images = await Image.findAll({
            where: { productId: id }
        });

        // Buscar opções do produto
        const options = await ProductOption.findAll({
            where: { product_id: id }
        });

        // Buscar categorias do produto
        const productCategories = await ProductCategory.findAll({
            where: { id: id }
        });

        const categoryIds = productCategories.map(pc => pc.id);

        // Formatar a resposta
        const formattedProduct = {
            id: product.id,
            enabled: product.enabled,
            name: product.name,
            slug: product.slug,
            use_in_menu: product.use_in_menu,
            stock: product.stock,
            description: product.description,
            price: product.price,
            price_with_discount: product.price_with_discount,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            category_ids: categoryIds,
            images: images.map(img => ({
                id: img.id,
                path: img.path // ajuste o campo conforme necessário
            })),
            options: options.map(option => ({
                id: option.id,
                title: option.title,
                values: option.values.split(',') // ajuste o campo conforme necessário
            }))
        };

        res.json(formattedProduct);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ message: 'Erro ao buscar produto', error: error.message });
    }
};


async function createProduct(req, res) {
    const {
        enabled, name, slug, stock, description, price, price_with_discount,
        category_ids, images, options
    } = req.body;

    try {
        // Cria o produto
        const product = await Product.create({
            enabled, name, slug, stock, description, price, price_with_discount
        });

        // Adiciona as categorias ao produto (simplesmente cria a associação)
        if (category_ids && category_ids.length > 0) {
            // Adiciona as categorias ao produto diretamente na tabela de associação
            await ProductCategory.bulkCreate(
                category_ids.map(category_id => ({
                    name: '',
                    slug: '',
                    productId: product.id,
                    categoryId: category_id
                }))
            );
        }

        await ProductCategories.bulkCreate(
            category_ids.map(category_id => ({
                product_id: product.id,
                category_id: category_id
            }))
        );

        // Adiciona as imagens ao produto
        if (images && images.length > 0) {
            for (const [index, image] of images.entries()) {
                const fileExtension = image.type.split('/')[1];
                const fileName = `${product.id}-${index + 1}.${fileExtension}`;
                const filePath = `/src/uploads/${fileName}`; // Caminho fictício

                // Cria a entrada da imagem no banco de dados
                await Image.create({
                    type: image.type,
                    path: filePath,
                    productId: product.id
                });
            }
        }

        // Adiciona as opções ao produto
        if (options && options.length > 0) {
            for (const option of options) {

                const radiusValue = option.radius ? parseInt(option.radius.replace('px', ''), 10) : 0;

                await ProductOption.create({
                    title: option.title,
                    shape: option.shape,
                    radius: radiusValue,
                    type: option.type,
                    values: option.values.join(','),
                    product_id: product.id
                });
            }
        }

        res.status(201).json({ message: 'Produto criado com sucesso!', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar produto.' });
    }
}

const updateProduct = (req, res) => {
    // ID do produto a ser atualizado
    const { id } = req.params;

    // Dados do produto fornecidos na requisição
    const { enabled, name, slug, stock, description, price, price_with_discount } = req.body;

    // Valida o ID
    if (!id) {
        return res.status(400).json({ message: 'ID do produto é necessário.' });
    }

    // Valida os dados fornecidos
    if (!name || !slug || stock === undefined || price === undefined || price_with_discount === undefined) {
        return res.status(400).json({ message: 'Dados inválidos. Todos os campos obrigatórios devem ser fornecidos.' });
    }

    // Encontra o produto a ser atualizado
    Product.findByPk(id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado.' });
            }

            // Atualiza o produto com os dados fornecidos
            return product.update({ enabled, name, slug, stock, description, price, price_with_discount });
        })
        .then(updatedProduct => {
            // Sucesso
            res.status(200).json({
                message: 'Produto atualizado com sucesso',
                product: updatedProduct
            });
        })
        .catch(error => {
            // Erro
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({
                message: 'Erro ao atualizar produto',
                error
            });
        });
};

const deleteProduct = (req, res) => {
    const id = req.params.id;

    Product.destroy({
        where: { id: id }
    })
        .then(deleted => {
            if (deleted === 0) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.sendStatus(204);
        })
        .catch(erro => {
            res.status(500).json({ message: 'Erro ao deletar produto', erro });
        });
};

module.exports = {
    getProduct,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
