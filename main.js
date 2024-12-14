import axios from 'axios';

    async function askQuestion() {
      const question = document.getElementById('question').value;
      const responseDiv = document.getElementById('response');

      try {
        const apiKey = 'AIzaSyAcVE_qkb7uYlKelJfoqsOV7rEVt16We58';
        const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + apiKey;

        const response = await axios.post(apiUrl, {
          contents: [{
            parts: [{
              text: question
            }]
          }]
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('API Response:', response);

        if (response.data && response.data.candidates && response.data.candidates.length > 0) {
          responseDiv.innerHTML = response.data.candidates[0].content.parts[0].text;
        } else {
          responseDiv.innerHTML = 'Geçersiz yanıt formatı.';
        }
      } catch (error) {
        console.error('Error:', error);
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
          responseDiv.innerHTML = `Hata: ${error.response.status} - ${error.response.data}`;
        } else if (error.request) {
          // Request was made but no response was received
          console.error('Request data:', error.request);
          responseDiv.innerHTML = 'İstek gönderildi ancak yanıt alınamadı.';
        } else {
          // Something else caused the error
          console.error('Error message:', error.message);
          responseDiv.innerHTML = `Hata: ${error.message}`;
        }
      }
    }

    window.askQuestion = askQuestion;
