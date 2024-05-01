import React, { useState, useEffect } from 'react';
import Popup from './Popup'
function ProductPage({ isLoggedIn,searchWord,searchResults,setSearchResults}) {

  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(0);
  const [targetPrice, setTargetPrice] = useState('');
  useEffect(() => {
    
    if (searchResults.length > 0) {
      setLoading(false); // Set loading to false once search results are available
    }
  }, [searchResults]);

  const handleInputChange = (e) => {
    setTargetPrice(e.target.value);
  };

  const handlePopupClose = () => {
    setShowPopup(0);
  };
  const handleAddToWishlist = async (productId, targetPrice) => {
    if (!isLoggedIn) {
      return;
    }
    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await fetch('http://127.0.0.1:8000/add_to_wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}` 
        },
        body: JSON.stringify({ productId, targetPrice }),
      });
      const data = await response.json();
      console.log(data);
      // Show success message or handle response accordingly
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Product Page</h2>
     
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          searchResults.map((product) => (
            <div key={product.productId}>
              <h3>{product.title}</h3>
              {product.image && <img src={product.image} alt="Product" />}
              {product.a_link && <a href={product.a_link}>Amazon</a>}
              {product.a_price && <p>Amazon Price: {product.a_price}</p>}
              {product.f_link && <a href={product.f_link}>Flipkart</a>}
              {product.f_price && <p>Flipkart Price: {product.f_price}</p>}
              {product.c_link && <a href={product.c_link}>Croma</a>}
              {product.c_price && <p>Croma Price: {product.c_price}</p>}
              {isLoggedIn && (
                <button onClick={() => {
                  
                  setShowPopup(product.productId);
                }
                }>{showPopup==product.productId && (
                  <div >
                    <button className="close-btn" onClick={()=>{
                    setShowPopup(0)
                  }}>Close</button>
                    <h2>Enter Target Price</h2>
                    <input type="text" value={targetPrice} onChange={handleInputChange} />
                    <button onClick={()=>
                      handleAddToWishlist(product.productId,targetPrice)}>Add to Wishlist</button>
                  </div>
                )}
                  Add to Wishlist
                </button>
                
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
  
}

export default ProductPage;
