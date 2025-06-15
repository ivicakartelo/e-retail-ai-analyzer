import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './OrderSummary.css';

const OrderSummary = ({ order, onClose }) => {
  if (!order) return null;

  const { order_id, articles, total_amount } = order;

  // Generate PDF Invoice
  const generateInvoice = () => {
    const doc = new jsPDF();
    const invoiceNumber = `INV-${order_id}`;

    doc.text('[LOGO]', 14, 10);
    doc.setFontSize(16).text('Awesome Company Inc.', 50, 20);
    doc.setFontSize(10).text('123 Business St., Commerce City, CA 94016', 50, 27);
    doc.text(`Phone: +1 (555) 123-4567 | Email: contact@awesomecompany.com`, 50, 32);
    doc.text(`Invoice Number: ${invoiceNumber}`, 14, 60);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 67);

    doc.autoTable({
      head: [['#', 'Article Name', 'Price', 'Quantity', 'Total']],
      body: articles.map((article, index) => [
        index + 1,
        article.name,
        `$${Number(article.price).toFixed(2)}`,
        article.quantity,
        `$${(article.price * article.quantity).toFixed(2)}`,
      ]),
      startY: 80,
    });

    doc.text(`Grand Total: $${total_amount}`, 14, doc.previousAutoTable.finalY + 10);
    doc.save(`${invoiceNumber}.pdf`);
  };

  return (
    <div className="order-summary">
      <h2>Thank You for Your Purchase!</h2>
      <p>Your order has been placed successfully.</p>
      <p><strong>Order ID:</strong> {order_id}</p>
      <table className="order-table">
        <thead>
          <tr>
            <th>Article</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.article_id}>
              <td>{article.name}</td>
              <td>${Number(article.price).toFixed(2)}</td>
              <td>{article.quantity}</td>
              <td>${(article.price * article.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p><strong>Total Amount:</strong> ${total_amount}</p>
      <button className="download-invoice-button" onClick={generateInvoice}>Download Invoice</button>
      <button className="close-summary-button" onClick={onClose}>Close</button>
    </div>
  );
};

export default OrderSummary;