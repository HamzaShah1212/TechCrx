import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import './AdminPanel.css'

export default function AdminPanel() {
  const { user, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    affiliate_link: '',
    category_id: '',
    status: true
  })

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/')
    }
  }, [isAdmin, navigate])

  // Fetch products and categories
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false })

      if (productsError) throw productsError
      setProducts(productsData || [])

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .eq('status', true)

      if (categoriesError) throw categoriesError
      setCategories(categoriesData || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      if (!formData.name || !formData.price) {
        setError('Name and Price are required')
        return
      }

      const dataToSubmit = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image,
        affiliate_link: formData.affiliate_link,
        category_id: formData.category_id ? parseInt(formData.category_id) : null,
        status: formData.status
      }

      if (editingId) {
        // Update product
        const { error } = await supabase
          .from('products')
          .update(dataToSubmit)
          .eq('id', editingId)

        if (error) throw error
        setSuccess('Product updated successfully!')
        setEditingId(null)
      } else {
        // Add new product
        const { error } = await supabase
          .from('products')
          .insert([dataToSubmit])

        if (error) throw error
        setSuccess('Product added successfully!')
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        affiliate_link: '',
        category_id: '',
        status: true
      })
      setShowForm(false)
      fetchData()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      image: product.image || '',
      affiliate_link: product.affiliate_link || '',
      category_id: product.category_id || '',
      status: product.status
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error
      setSuccess('Product deleted successfully!')
      fetchData()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      affiliate_link: '',
      category_id: '',
      status: true
    })
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="admin-panel">
      <div className="admin-container">
        <div className="admin-header">
          <h1>📊 Admin Dashboard</h1>
          <p>Manage Products</p>
        </div>

        {error && <div className="alert error-alert">{error}</div>}
        {success && <div className="alert success-alert">{success}</div>}

        <div className="admin-content">
          {!showForm ? (
            <div className="products-section">
              <div className="section-header">
                <h2>Products ({products.length})</h2>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowForm(true)}
                >
                  ➕ Add New Product
                </button>
              </div>

              {loading ? (
                <p className="loading">Loading...</p>
              ) : products.length === 0 ? (
                <p className="no-products">No products found. Add your first product!</p>
              ) : (
                <div className="products-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id}>
                          <td className="image-cell">
                            {product.image && (
                              <img src={product.image} alt={product.name} />
                            )}
                          </td>
                          <td>
                            <strong>{product.name}</strong>
                            <p className="description">{product.description?.substring(0, 50)}...</p>
                          </td>
                          <td>${product.price}</td>
                          <td>
                            {categories.find(c => c.id === product.category_id)?.name || 'N/A'}
                          </td>
                          <td>
                            <span className={`status ${product.status ? 'active' : 'inactive'}`}>
                              {product.status ? '✓ Active' : '✕ Inactive'}
                            </span>
                          </td>
                          <td className="actions">
                            <button
                              className="btn btn-edit"
                              onClick={() => handleEdit(product)}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className="btn btn-delete"
                              onClick={() => handleDelete(product.id)}
                            >
                              🗑️ Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="form-section">
              <div className="form-header">
                <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              </div>

              <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                  <label htmlFor="name">Product Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter product description"
                    rows="4"
                  ></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="price">Price *</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="category_id">Category</label>
                    <select
                      id="category_id"
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="image">Image URL</label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.png"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="affiliate_link">Affiliate Link</label>
                  <input
                    type="text"
                    id="affiliate_link"
                    name="affiliate_link"
                    value={formData.affiliate_link}
                    onChange={handleChange}
                    placeholder="https://affiliate-link.com"
                  />
                </div>

                <div className="form-group checkbox">
                  <label htmlFor="status">
                    <input
                      type="checkbox"
                      id="status"
                      name="status"
                      checked={formData.status}
                      onChange={handleChange}
                    />
                    Active
                  </label>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {editingId ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
