import { useState } from 'react';
import Card from "../Card/Card"
import styles from './paginatedList.module.css';

const PaginatedList = ({ items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div>
      <div className={styles.grid}>
        {currentItems.map((item, index) => (
          <Card
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            timestamp={item.createdAt}
            slug={item.slug}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number + 1)}
            className={currentPage === number + 1 ? styles.active : ''}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaginatedList;
