const form = document.getElementById('contactForm');
        const formStatus = document.getElementById('formStatus');
        const whatsappLink = "https://chat.whatsapp.com/LO3nQiGwkjmHFBX5uij5GQ";

        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            const json = JSON.stringify(object);

            formStatus.style.display = 'block';
            formStatus.className = 'message'; 
            formStatus.innerHTML = 'Sending...';

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json' 
                    },
                    body: json
                });

                if (response.ok) {
                    formStatus.className = 'message success';
                    formStatus.innerHTML = 'Your message has been sent successfully!';
                    setTimeout(() => {
                        window.location.href = whatsappLink; 
        }, 1500);
                    form.reset();
                } else {
                    const data = await response.json(); 
                    formStatus.className = 'message error';
                    formStatus.innerHTML = data.errors ? data.errors.map(err => err.message).join('<br>') : 'An error occurred. Please try again.';
                    console.error('Form submission error:', data);
                }
            } catch (error) {
                formStatus.className = 'message error';
                formStatus.innerHTML = 'Network error. Please check your internet connection.';
                console.error('Fetch API error:', error);
            }
        });