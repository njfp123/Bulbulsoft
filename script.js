document.addEventListener('DOMContentLoaded', () => {

    // --- Modal Handling ---
    const orderModal = document.getElementById('order-modal');
    const closeModalButton = document.querySelector('.close-button');
    const buyButtons = document.querySelectorAll('.buy-button');

    // Function to open the modal
    const openModal = () => orderModal.classList.add('active');
    
    // Function to close the modal
    const closeModal = () => orderModal.classList.remove('active');

    // Add click listeners to all "Order Now" buttons
    buyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.product-card');
            
            // Get product info from the card
            const name = card.querySelector('.product-name').textContent;
            const price = card.querySelector('.product-price').textContent;
            const size = card.querySelector('.product-size').value;

            // Populate the summary in the modal
            document.getElementById('summary-product-name').textContent = name;
            document.getElementById('summary-product-size').textContent = size;
            document.getElementById('summary-product-price').textContent = price;

            // Populate the hidden form fields for Netlify
            document.getElementById('modal-product-name').value = name;
            document.getElementById('modal-product-size').value = size;
            document.getElementById('modal-product-price').value = price;
            
            openModal();
        });
    });

    // Close modal events
    closeModalButton.addEventListener('click', closeModal);
    orderModal.addEventListener('click', (event) => {
        if (event.target === orderModal) {
            closeModal();
        }
    });

    // --- WhatsApp Button Handling ---
    const whatsappButton = document.getElementById('whatsapp-button');
    whatsappButton.addEventListener('click', () => {
        // Your WhatsApp Number
        const yourNumber = '7006631292';

        // Get product info
        const productName = document.getElementById('modal-product-name').value;
        const productSize = document.getElementById('modal-product-size').value;
        const productPrice = document.getElementById('modal-product-price').value;
        
        // Get customer info from the form
        const customerName = document.querySelector('form[name="order"] input[name="name"]').value;
        const customerAddress = document.querySelector('form[name="order"] textarea[name="address"]').value;
        
        // Basic validation
        if (!customerName || !customerAddress) {
            alert('Please fill in your Name and Address before ordering via WhatsApp.');
            return;
        }

        // Create the message
        const message = `Hello bulbulsoft! I would like to place an order:
*Product:* ${productName}
*Size:* ${productSize}
*Price:* ${productPrice}

*My Details:*
*Name:* ${customerName}
*Shipping Address:* ${customerAddress}

Please confirm my order. Thank you!`;

        // Create the WhatsApp URL
        const whatsappURL = `https://wa.me/${yourNumber}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp in a new tab
        window.open(whatsappURL, '_blank');
    });

});
