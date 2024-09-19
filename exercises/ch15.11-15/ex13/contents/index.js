let elm = document.querySelector('#uploadForm')
elm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const chatForm = document.querySelector('#chatForm').value;
    const message = document.querySelector('#message');

    const uploadUrl = `http://localhost:11434/api/generate`;

    try {
        const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gemma2:2b',
                prompt: chatForm,
            }),
        });
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let result = '';
        while (true) {

            const {done, value} = await reader.read();
            if (done) break;
            result += decoder.decode(value);

            // JSONデータをパースしてresponseプロパティを抽出
            console.log(result);
            //jsonが複数行にまたがる場合があるので、改行で分割してから処理しないと死ぬ
            const jsonResponses = result.trim().split('\n');
            let combinedResponse = '';
            jsonResponses.forEach(jsonStr => {
                const jsonResponse = JSON.parse(jsonStr);
                combinedResponse += jsonResponse.response;
            });
            // LLMの応答を逐次表示
            message.style.textAlign = 'left';
            message.textContent = combinedResponse;
        }
    } catch (error) {
        console.log(`エラーが発生しました: ${error.message}`);
    }
});