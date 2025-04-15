import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Подключение Firebase
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null); // Последний видимый элемент
  const [hasNextPage, setHasNextPage] = useState(true); // Есть ли следующая страница
  const pageSize = 10; // Количество товаров на странице

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (startAfterDoc = null) => {
    let q = query(
      collection(db, 'products'),
      orderBy('createdAt'),
      limit(pageSize)
    );

    if (startAfterDoc) {
      q = query(q, startAfter(startAfterDoc));
    }

    try {
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setProducts(productsList);

      if (querySnapshot.docs.length < pageSize) {
        setHasNextPage(false); // Если меньше элементов, чем pageSize, значит, это последняя страница
      }

      setLastVisible(lastVisibleDoc); // Обновляем последний видимый документ
    } catch (error) {
      console.error('Ошибка получения данных: ', error);
    }
  };

  // Загружаем следующую страницу
  const loadNextPage = () => {
    if (hasNextPage) {
      fetchProducts(lastVisible);
    }
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
      <button onClick={loadNextPage} disabled={!hasNextPage}>
        {hasNextPage ? 'Load More' : 'No more products'}
      </button>
    </div>
  );
};

export default Products;
