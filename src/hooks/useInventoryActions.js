import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export function useInventoryActions() {
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", id));
      alert("Product deleted!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // You can add more inventory action functions here like updateProductQuantity

  return { deleteProduct };
}
