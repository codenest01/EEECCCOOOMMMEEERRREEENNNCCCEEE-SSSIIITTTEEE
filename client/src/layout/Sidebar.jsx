import React, { useState } from 'react';
import { FiAlignCenter } from 'react-icons/fi';

function Sidebar() {
  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen'];
  const items = {
    Electronics: ['Laptop', 'Mobile', 'Headphones'],
    Clothing: ['T-shirt', 'Jeans', 'Jacket'],
    Books: ['Fiction', 'Non-fiction', 'Comics'],
    Home: ['Furniture', 'Kitchenware', 'Decor'],
  };

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedItem('');
  };

  const handleItemChange = (event) => {
    setSelectedItem(event.target.value);
  };

  return (
    <nav className="navbar fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Logo</a>
        
        {/* Using React Icon as the offcanvas toggler */}
        <FiAlignCenter
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
          style={{ fontSize: '44px', cursor: 'pointer' }}
        />

        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Dark offcanvas</h5>
            <button
              type="button"
              className="btn-close btn-close-dark"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
            </ul>

            <div className="mt-3">
              <label htmlFor="categorySelect" className="form-label">Select Category</label>
              <select
                id="categorySelect"
                className="form-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Choose a category...</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategory && (
              <div className="mt-3">
                <label htmlFor="itemSelect" className="form-label">Select Item</label>
                <select
                  id="itemSelect"
                  className="form-select"
                  value={selectedItem}
                  onChange={handleItemChange}
                >
                  <option value="">Choose an item...</option>
                  {items[selectedCategory].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
