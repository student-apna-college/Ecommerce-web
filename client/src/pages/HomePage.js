import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Checkbox, Radio, Pagination } from 'antd'; // Import Pagination from antd
import { Prices } from '../components/Prices';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';

function HomePage () {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [pageSize, setPageSize] = useState(6); // Items per page

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('https://ecommerce-web-86gg.onrender.com/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);
  }

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProduct();
  }, [checked.length, radio.length, currentPage]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio, currentPage]);

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get('https://ecommerce-web-86gg.onrender.com/api/v1/product/get-product', {
        params: { page: currentPage, limit: pageSize }
      });
      setProduct(data.products);
      setTotal(data.total); // Update total product count
    } catch (error) {
      console.log(error);
    }
  }

  const filterProduct = async () => {
    try {
      const { data } = await axios.post('https://ecommerce-web-86gg.onrender.com/api/v1/product/product-filter', { checked, radio, page: currentPage, limit: pageSize });
      setProduct(data?.product);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  }

  const getTotal = async () => {
    try {
      const { data } = await axios.get('https://ecommerce-web-86gg.onrender.com/api/v1/product/product-count');
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTotal();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  return (
    <>
      <Layout title={"All product - Best offers"}>
        <div className='row mt-2'>
          <div className='col-md-3 mt-3'>
            <h4 className='text-center mt-3'>Filter By category</h4>
            <div className='d-flex flex-column p-3'>
              {categories?.map(c => (
                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4 className='text-center'>Filter By Price</h4>
            <div className='d-flex flex-column p-3'>
              <Radio.Group onChange={e => setRadio(e.target.value)}>
                {Prices?.map(product => (
                  <div key={product.id}>
                    <Radio value={product.array}>{product.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className='d-flex-column'>
              <button className='btn btn-danger' onClick={() => window.location.reload()}>RESET FILTER</button>
            </div>
          </div>
          <div className='col-md-9'>
            <h1 className='text-center'>All Product</h1>
            <div className='d-flex flex-wrap'>
              {products?.map((pr) => (
                <div key={pr._id} className="card m-2" style={{ width: '18rem' }}>
                  <img src={`/api/v1/product/product-photo/${pr._id}`} className="card-img-top" alt={pr.name} />
                  <div className="card-body">
                    <h5 className="card-title">{pr.name}</h5>
                    <h5 className="card-title">${pr.price}</h5>
                    <p className="card-text">{pr.description.substring(0, 30)}</p>
                    <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${pr.slug}`)}>Go somewhere</button>
                    <button className="btn btn-secondary ms-1" onClick={() => {
                      setCart([...cart, pr]);
                      localStorage.setItem("cart", JSON.stringify([...cart, pr]));
                      toast.success('Added to Cart Successfully');
                    }}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <button className='btn btn-warning'>Total {total} Products</button>
            </div>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={total}
              onChange={handlePageChange}
              showSizeChanger={false} // Hide page size changer
              style={{ marginTop: '20px' }} // Optional: Add some margin for spacing
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export default HomePage;
