import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationPage = ({ currentPage, totalPages, onPageChange }) => {
  // Nếu chỉ có 1 trang hoặc không có trang nào thì không cần hiển thị phân trang
  if (totalPages <= 1) return null;

  // Hàm xử lý đổi trang
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  // Tạo danh sách các item ở giữa
  let items = [];
  
  // Logic hiển thị item:
  // Luôn hiển thị trang 1 và trang cuối.
  // Các trang ở giữa sẽ dùng Ellipsis (...) nếu khoảng cách quá xa.
  
  // Case đặc biệt: Nếu ít trang (<= 4) thì hiển thị hết cho đẹp (1 2 3 4)
  // Nếu bạn CỐ ĐỊNH muốn 4 trang mà hiện 1 ... 4 thì logic sẽ cứng nhắc, 
  // nên mình làm logic linh động (smart pagination) để người dùng dễ bấm hơn.
  
  if (totalPages <= 4) {
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item 
          key={number} 
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>,
      );
    }
  } else {
    // Logic cho nhiều trang (> 4 trang)
    
    // 1. Luôn hiện trang đầu (1)
    items.push(
      <Pagination.Item key={1} active={1 === currentPage} onClick={() => handlePageChange(1)}>
        {1}
      </Pagination.Item>
    );

    // 2. Xử lý Ellipsis đầu
    if (currentPage > 3) {
      items.push(<Pagination.Ellipsis key="start-ellipsis" />);
    }

    // 3. Các trang xung quanh trang hiện tại (Current - 1, Current, Current + 1)
    // Chỉ render nếu nó không phải là trang 1 và không phải trang cuối
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item 
          key={number} 
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    // 4. Xử lý Ellipsis cuối
    if (currentPage < totalPages - 2) {
      items.push(<Pagination.Ellipsis key="end-ellipsis" />);
    }

    // 5. Luôn hiện trang cuối
    items.push(
      <Pagination.Item 
        key={totalPages} 
        active={totalPages === currentPage} 
        onClick={() => handlePageChange(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="justify-content-center">
      {/* Nút về trang đầu */}
      <Pagination.First 
        disabled={currentPage === 1} 
        onClick={() => handlePageChange(1)} 
      />
      
      {/* Nút về trang trước */}
      <Pagination.Prev 
        disabled={currentPage === 1} 
        onClick={() => handlePageChange(currentPage - 1)} 
      />

      {/* Danh sách các trang số */}
      {items}

      {/* Nút đến trang kế tiếp */}
      <Pagination.Next 
        disabled={currentPage === totalPages} 
        onClick={() => handlePageChange(currentPage + 1)} 
      />
      
      {/* Nút đến trang cuối */}
      <Pagination.Last 
        disabled={currentPage === totalPages} 
        onClick={() => handlePageChange(totalPages)} 
      />
    </Pagination>
  );
};

export default PaginationPage;