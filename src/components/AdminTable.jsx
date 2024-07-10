import React, { useState, useEffect } from 'react';
import { getAllProducts, createProduct, editProduct, deleteProduct, getProductsById } from '../interceptors/product.interceptor'; 
import Caracteristica from './Caracteristica';
import Categoria from './Categoria'; 
import { getAllCategorias } from '../interceptors/categoria.interceptor';
import { getAllCaracteristicas } from '../interceptors/caracteristica.interceptor';

const AdminTable = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProductId, setEditingProductId] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [capacidad, setCapacidad] = useState(0);
    const [precioNoche, setPrecioNoche] = useState(0.0);
    const [disponibilidadDesde, setDisponibilidadDesde] = useState('');
    const [disponibilidadHasta, setDisponibilidadHasta] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [caracteristicas, setCaracteristicas] = useState([]);
    const [selectedCaracteristica, setSelectedCaracteristica] = useState('');
    const [pais, setPais] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [direccionExacta, setDireccionExacta] = useState('');
    const [imagenes, setImagenes] = useState([{ id: null, nombre: '', rutaDeArchivo: '' }]);

    const loadCategoriesAndCharacteristics = async () => {
        try {
            const categoriasList = await getAllCategorias();
            setCategorias(categoriasList);
            
            const caracteristicasList = await getAllCaracteristicas();
            setCaracteristicas(caracteristicasList);
        } catch (error) {
            console.error("Ocurrió un error inesperado al traer las categorías o características:", error);
            setCategorias([]);
            setCaracteristicas([]);
        }
    };

    useEffect(() => {
        loadCategoriesAndCharacteristics();
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingProductId(null);
        setNombre('');
        setDescripcion('');
        setCapacidad(0);
        setPrecioNoche(0.0);
        setDisponibilidadDesde('');
        setDisponibilidadHasta('');
        setSelectedCategoryId('');
        setSelectedCaracteristica('');
        setPais('');
        setCiudad('');
        setCodigoPostal('');
        setDireccionExacta('');
        setImagenes([{ id: null, nombre: '', rutaDeArchivo: '' }]);
    };

    const handleShowModal = () => {
        loadCategoriesAndCharacteristics();
        setShowModal(true);
    };

    const handleSaveProduct = async () => {
        try {
            if (editingProductId) {
                await handleEditProduct(editingProductId);
            } else {
                await handleCreateProduct();
            }
        } catch (error) {
            console.error("Ocurrió un error al guardar el producto:", error);
        }
    };

    const handleCreateProduct = async () => {
        try {
            const newProduct = {
                nombre,
                descripcion,
                capacidad,
                precioNoche,
                disponibilidad_Desde: disponibilidadDesde,
                disponibilidad_Hasta: disponibilidadHasta,
                ubicacion: {
                    pais,
                    ciudad,
                    codigoPostal,
                    direccionExacta
                },
                imagenes: imagenes.map(imagen => ({
                    id: imagen.id,
                    nombre: imagen.nombre,
                    rutaDeArchivo: imagen.rutaDeArchivo
                })),
                categorias: [{ id: selectedCategoryId }],
                caracteristicas: [{ id: selectedCaracteristica }]
            };
            await createProduct(newProduct);
            const productList = await getAllProducts();
            setProducts(productList);
            handleCloseModal();
        } catch (error) {
            console.error("Ocurrió un error al crear el producto:", error);
        }
    };

    const handleEditProduct = async (productId) => {
        try {
            // Obtener el producto actual
            const existingProduct = await getProductsById(productId);
    
            // Crear un objeto base para el producto actualizado
            const updatedProduct = {
                id: productId,
                nombre,
                descripcion,
                capacidad,
                precioNoche,
                disponibilidad_Desde: disponibilidadDesde,
                disponibilidad_Hasta: disponibilidadHasta,
                ubicacion: {
                    id: existingProduct.ubicacion?.id,
                    pais: existingProduct.ubicacion?.pais,
                    ciudad: existingProduct.ubicacion?.ciudad,
                    codigoPostal: existingProduct.ubicacion?.codigoPostal,
                    direccionExacta: existingProduct.ubicacion?.direccionExacta
                },
                imagenes: imagenes.map(imagen => ({
                    id: imagen.id,
                    nombre: imagen.nombre,
                    rutaDeArchivo: imagen.rutaDeArchivo
                })),
                categorias: [{ id: selectedCategoryId }],
                caracteristicas: [{ id: selectedCaracteristica }]
            };
    
            // Llamar a la API para editar el producto
            await editProduct(productId, updatedProduct);
    
            // Actualizar la lista de productos y cerrar el modal
            const productList = await getAllProducts();
            setProducts(productList);
            handleCloseModal();
        } catch (error) {
            console.error("Ocurrió un error al editar el producto:", error);
        }
    };
    
    
    

    const handleDeleteProduct = async (productId) => {
        try {
            const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
            if (confirmDelete) {
                await deleteProduct(productId);
                const productList = await getAllProducts();
                setProducts(productList);
            } else {
                console.log("Eliminación cancelada.");
            }
        } catch (error) {
            console.error("Ocurrió un error al eliminar el producto:", error);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productList = await getAllProducts();
                console.log(productList)
                setProducts(productList);
            } catch (error) {
                console.error("Ocurrió un error inesperado al traer los productos:", error);
                setProducts(null);
            }
        };
        fetchProducts();

        loadCategoriesAndCharacteristics();
    }, []);

    const handleImageChange = (index, field, value) => {
        const updatedImages = [...imagenes];
        updatedImages[index] = { ...updatedImages[index], [field]: value };
        setImagenes(updatedImages);
    };

    const handleAddImage = () => {
        setImagenes([...imagenes, { id: null, nombre: '', rutaDeArchivo: '' }]);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = imagenes.filter((_, i) => i !== index);
        setImagenes(updatedImages);
    };

    return (
        <div className='d-none d-lg-block'>
            <div className="text-center d-flex align-items-center justify-content-left">
                <p className='fw-semibold me-2 mt-3'><i className="bi bi-filter"></i> Filtros</p>
                <button type="button" className="btn btn-custom-green" onClick={handleShowModal}>+ Agregar producto</button>
            </div>
            {products === null ? (
                <div className="px-4 mt-3">
                    <h4 className="fs-3 text-center m-5">No se pudieron cargar los productos. Inténtalo de nuevo más tarde.</h4>
                </div>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Capacidad</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map(product => (
                            <tr key={product.id}>
                                <th scope="row">{product.id}</th>
                                <td>{product.nombre}</td>
                                <td>{product.descripcion}</td>
                                <td>{product.capacidad} personas</td>                              
                                <td>${product.precioNoche}</td>
                                <td>
                                    <button type="button" className="btn btn-danger me-2" onClick={() => handleDeleteProduct(product.id)}><i className="bi bi-trash3"></i></button>
                                    <button type="button" className="btn btn-custom-green" onClick={() => {
                                        setEditingProductId(product.id);
                                        setNombre(product.nombre);
                                        setDescripcion(product.descripcion);
                                        setCapacidad(product.capacidad);
                                        setPrecioNoche(product.precioNoche);
                                        setDisponibilidadDesde(product.disponibilidad_Desde);
                                        setDisponibilidadHasta(product.disponibilidad_Hasta);
                                        setSelectedCategoryId(product.categorias[0]?.id || '');
                                        setSelectedCaracteristica(product.caracteristicas[0]?.id || '');
                                        setPais(product.ubicacion?.pais || '');
                                        setCiudad(product.ubicacion?.ciudad || '');
                                        setCodigoPostal(product.ubicacion?.codigoPostal || '');
                                        setDireccionExacta(product.ubicacion?.direccionExacta || '');
                                        setImagenes(product.imagenes.map(img => ({ id: img.id, nombre: img.nombre, rutaDeArchivo: img.rutaDeArchivo })));
                                        setShowModal(true);
                                    }}>
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {showModal && (
                <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editingProductId ? 'Editar producto' : 'Agregar producto'}</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="descripcion" className="form-label">Descripción</label>
                                        <textarea className="form-control" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="capacidad" className="form-label">Capacidad</label>
                                        <input type="number" className="form-control" id="capacidad" value={capacidad} onChange={(e) => setCapacidad(parseInt(e.target.value))} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="precioNoche" className="form-label">Precio por Noche</label>
                                        <input type="number" step="0.01" className="form-control" id="precioNoche" value={precioNoche} onChange={(e) => setPrecioNoche(parseFloat(e.target.value))} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="disponibilidadDesde" className="form-label">Disponibilidad Desde</label>
                                        <input type="date" className="form-control" id="disponibilidadDesde" value={disponibilidadDesde} onChange={(e) => setDisponibilidadDesde(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="disponibilidadHasta" className="form-label">Disponibilidad Hasta</label>
                                        <input type="date" className="form-control" id="disponibilidadHasta" value={disponibilidadHasta} onChange={(e) => setDisponibilidadHasta(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="categoria" className="form-label">Categoría</label>
                                        <select className="form-select" id="categoria" value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
                                            <option value="">Selecciona una categoría</option>
                                            {categorias.map(categoria => (
                                                <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="caracteristica" className="form-label">Características</label>
                                        <select className="form-select" id="caracteristica" value={selectedCaracteristica} onChange={(e) => setSelectedCaracteristica(e.target.value)}>
                                            <option value="">Selecciona una característica</option>
                                            {caracteristicas.map(caracteristica => (
                                                <option key={caracteristica.id} value={caracteristica.id}>{caracteristica.nombre}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pais" className="form-label">País</label>
                                        <input type="text" className="form-control" id="pais" value={pais} onChange={(e) => setPais(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="ciudad" className="form-label">Ciudad</label>
                                        <input type="text" className="form-control" id="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="codigoPostal" className="form-label">Código Postal</label>
                                        <input type="text" className="form-control" id="codigoPostal" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="direccionExacta" className="form-label">Dirección Exacta</label>
                                        <input type="text" className="form-control" id="direccionExacta" value={direccionExacta} onChange={(e) => setDireccionExacta(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Imágenes</label>
                                        {imagenes.map((imagen, index) => (
                                            <div key={index} className="d-flex align-items-center mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control me-2"
                                                    placeholder="Nombre de la imagen"
                                                    value={imagen.nombre}
                                                    onChange={(e) => handleImageChange(index, 'nombre', e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    className="form-control me-2"
                                                    placeholder="Ruta de archivo"
                                                    value={imagen.rutaDeArchivo}
                                                    onChange={(e) => handleImageChange(index, 'rutaDeArchivo', e.target.value)}
                                                />
                                                <button type="button" className="btn btn-danger" onClick={() => handleRemoveImage(index)}>
                                                    <i className="bi bi-trash3"></i>
                                                </button>
                                            </div>
                                        ))}
                                        <button type="button" className="btn btn-custom-green" onClick={handleAddImage}>+ Agregar imagen</button>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
                                <button type="button" className="btn btn-custom-green" onClick={handleSaveProduct}>{editingProductId ? 'Guardar cambios' : 'Agregar producto'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <button
                type="button"
                className="btn btn-custom-green mt-3"
                data-bs-toggle="modal"
                data-bs-target="#caracteristicaModal"
            >
                Administrar características
            </button>

            <button
                type="button"
                className="btn btn-custom-green mt-3 mx-2"
                data-bs-toggle="modal"
                data-bs-target="#categoriaModal"
            >
                Administrar categorías
            </button>


            <Caracteristica />

            <Categoria />
        </div>
    );
};

export default AdminTable;
