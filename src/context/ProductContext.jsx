import { createContext, useContext, useState, useEffect } from 'react'
import { SEED_PRODUCTS } from '../data/products.js'

const ProductContext = createContext(null)

export function ProductProvider({ children }) {
  const [adminProducts, setAdminProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('homefresh_admin_products')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('homefresh_admin_products', JSON.stringify(adminProducts))
  }, [adminProducts])

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: `admin-${Date.now()}`,
      isAdmin: true,
      isNew: true,
    }
    setAdminProducts(prev => [newProduct, ...prev])
    return newProduct
  }

  const deleteProduct = (id) => {
    setAdminProducts(prev => prev.filter(p => p.id !== id))
  }

  // Merge seed products + admin uploads
  const allProducts = [...adminProducts, ...SEED_PRODUCTS]

  const getByCategory = (categoryId) =>
    allProducts.filter(p => p.category === categoryId)

  const getNewArrivals = (limit = 8) => {
    const newOnes = allProducts.filter(p => p.isNew || p.isAdmin)
    return newOnes.slice(0, limit)
  }

  const getAllProducts = () => allProducts

  return (
    <ProductContext.Provider value={{
      allProducts, adminProducts,
      addProduct, deleteProduct,
      getByCategory, getNewArrivals, getAllProducts,
    }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  const ctx = useContext(ProductContext)
  if (!ctx) throw new Error('useProducts must be used within ProductProvider')
  return ctx
}
