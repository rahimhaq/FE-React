import { useState } from 'react';
import TodoList from './components/TodoList';
import ProductCard from './components/ProductCard';
import ShoppingCart from './components/ShoppingCart';
import './App.css';

// Mendefinisikan tipe data untuk semua state
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

function App() {
  // === STATE & DATA UNTUK TO-DO LIST ===
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Belajar React Props', completed: true },
    { id: 2, text: 'Memahami useState Hook', completed: false },
    { id: 3, text: 'Implementasi Conditional Rendering', completed: false },
  ]);

  // === STATE & DATA UNTUK PRODUK & CART ===
  const [products] = useState<Product[]>([
    { id: 1, name: 'Laptop', price: 1200, image: 'https://via.placeholder.com/200/007BFF/FFFFFF?text=Laptop' },
    { id: 2, name: 'Mouse', price: 25, image: 'https://via.placeholder.com/200/28A745/FFFFFF?text=Mouse' },
    { id: 3, name: 'Keyboard', price: 80, image: 'https://via.placeholder.com/200/DC3545/FFFFFF?text=Keyboard' },
  ]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // === FUNGSI HANDLER UNTUK TO-DO LIST ===
  const handleToggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // === FUNGSI HANDLER UNTUK PRODUK & CART ===
  const handleAddToCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const productToAdd = products.find(product => product.id === productId);
        return productToAdd ? [...prevCart, { ...productToAdd, quantity: 1 }] : prevCart;
      }
    });
  };
  

  // Menghitung total item di keranjang (Derived State)
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  // === TAMPILAN (JSX) ===
  return (
    <div className="container">
      {/* Komponen Keranjang Belanja di bagian atas */}
      <ShoppingCart itemCount={totalItemsInCart} />

      {/* Bagian To-Do List */}
      <div className="card">
        <h1>My To-Do List</h1>
        <TodoList todos={todos} onToggle={handleToggleTodo} />
      </div>
      


      {/* Bagian Katalog Produk */}
      <div className="card">
        <h1>Product Catalog</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              {...product} // Shortcut untuk passing semua properti product
              onAddToCart={handleAddToCart}
              isInCart={cart.some(item => item.id === product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;