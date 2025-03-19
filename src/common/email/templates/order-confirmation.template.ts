export const generateOrderConfirmationTemplate = (order) => `
    <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .logo-container {
            justify-content: center; 
            padding-bottom: 10px;
            justify-self: center;
            display: flex;
            width: 30%;
            margin: auto;
          }
          .logo-image {
            width: 50px; 
            height: auto; 
            margin-right: 10px; 
          }

          .logo-text {
            font-size: 33px; 
            font-weight: bold; 
            color: #3f51b5; 
            
          }            
          .container .logo-container {
            justify-content: center; 
          }
          .header {
            background-color: #1a237e;
            color: white;
            padding: 20px;
            text-align: center;
          }
          .content {
            padding: 20px;
            background-color: #f8f9fa;
          }
          .section {
            background-color: white;
            border-radius: 4px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .section-title {
            color: #1a237e;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
          }
          .section-title i {
            margin-right: 8px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .info-item {
            margin-bottom: 10px;
          }
          .label {
            color: #666;
            font-size: 12px;
            margin-bottom: 4px;
          }
          .value {
            font-size: 14px;
            font-weight: 500;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .table th, .table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #eee;
          }
          .table th {
            background-color: #f8f9fa;
            font-weight: 600;
          }
          .total {
            text-align: right;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 4px;
          }
          .total-label {
            font-size: 16px;
            font-weight: 500;
            margin-right: 10px;
          }
          .total-value {
            font-size: 20px;
            font-weight: 700;
            color: #1a237e;
          }
          .footer {
            text-align: center;
            padding: 20px;
            background-color: #1a237e;
            color: white;
          }
          .status {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 4px;
            font-weight: 500;
            background-color: #4caf50;
            color: white;
          }
          .status.cancelled {
            background-color: #f44336;
          }
        </style>
      </head>
      <body>
        <div class="container">
          
          <div class="logo-container" style="justify-content: center">
            <img src="https://storage.googleapis.com/invoiceexternaldocs/rentals/temp-logo.png" alt="Logo" class="logo-image">
            <span class="logo-text">Palmo</span>
          </div>

          <div class="header">
            <h1>Order Confirmation</h1>
            <p>Thank you for your order!</p>
          </div>
          
          <div class="content">
            <div class="section">
              <div class="section-title">
                <i>📋</i> Order Information
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="label">Order ID</div>
                  <div class="value">#${order.id}</div>
                </div>
                <div class="info-item">
                  <div class="label">Order Date</div>
                  <div class="value">${new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
                <div class="info-item">
                  <div class="label">Status</div>
                  <div class="status ${order.isCancelled ? 'cancelled' : ''}">
                    ${order.isCancelled ? 'Cancelled' : 'Active'}
                  </div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">
                <i>👤</i> Customer Details
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="label">Name</div>
                  <div class="value">${order.customer.firstName} ${order.customer.lastName}</div>
                </div>
                <div class="info-item">
                  <div class="label">Email</div>
                  <div class="value">${order.customer.emailId}</div>
                </div>
                <div class="info-item">
                  <div class="label">Phone</div>
                  <div class="value">${order.customer.mobileNumber}</div>
                </div>
                <div class="info-item">
                  <div class="label">Address</div>
                  <div class="value">
                    ${order.customer.address}
                    ${order.customer.aptSuite ? `, ${order.customer.aptSuite}` : ''}<br>
                    ${order.customer.city}, ${order.customer.state} ${order.customer.zipCode}
                  </div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">
                <i>📅</i> Rental Details
              </div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="label">Start Date</div>
                  <div class="value">${new Date(order.rentalStartDate).toLocaleDateString()}</div>
                </div>
                <div class="info-item">
                  <div class="label">End Date</div>
                  <div class="value">${new Date(order.rentalEndDate).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">
                <i>🛍️</i> Order Items
              </div>
              <table class="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${order.orderDetails.map(detail => `
                    <tr>
                      <td>${detail.product.name}</td>
                      <td>${detail.quantity}</td>
                      <td>$${parseInt(detail.product.price).toFixed(2)}</td>
                      <td>$${(detail.quantity * parseInt(detail.product.price)).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              <div class="total">
                <span class="total-label">Total Amount:</span>
                <span class="total-value">$${parseInt(order.totalAmount).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div class="footer">
            <p>Thank you for choosing our services!</p>
            <p>If you have any questions, please contact us at support@example.com</p>
          </div>
        </div>
      </body>
      </html>`;