const Product = require('../models/product');
const Image = require('../models/image');
const ProductOption = require('../models/product_options');
const ProductCategory = require('../models/category');
const ProductCategories = require('../models/product_categories');

const getProduct = (req, res) => {
    Product.findAll()
        .then(products => {
            res.json(products);
        })
        .catch(erro => {
            res.status(500).json({ message: 'Erro ao buscar produtos', erro });
        });
};

const getProductById = (req, res) => {
    const id = req.params.id;
    Product.findByPk(id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }
            res.json(product);
        })
        .catch(erro => {
            res.status(500).json({ message: 'Erro ao buscar produto', erro });
        });
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
                    values: option.values.join(','), // Convertendo o array para uma string separada por vírgulas
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
