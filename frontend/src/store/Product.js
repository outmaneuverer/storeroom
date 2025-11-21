import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  // 🔹 Set products manually
  setProducts: (products) => set({ products }),

  // 🔹 Create new product (POST to backend)
  createProduct: async (newProduct) => {
    // Validate input
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required" };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Failed to create product" };
      }

      // Update Zustand state
      set((state) => ({
        products: [...state.products, data.data],
      }));

      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Error creating product:", error);
      return { success: false, message: "Something went wrong" };
    }
  },
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.message || "Failed to delete product" };
      }
      //uptades the ui immediately without waiting refresh
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { success: false, message: "Something went wrong" };
    }
    
  },
  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.message || "Failed to update product" };
      }
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? { ...product, ...updatedProduct } : product
        ),
      }));
      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: "Something went wrong" };
    }
}
}));
