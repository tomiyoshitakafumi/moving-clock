let elm = document.querySelector('#uploadForm')
elm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const accessToken = document.getElementById('accessToken').value;
    //ひとまず1つだけファイルをアップロードする
    const fileInput = document.getElementById('fileInput').files[0];

    const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${fileInput.name}:/content`;

    try {
        const response = await fetch(uploadUrl, {
            //https://learn.microsoft.com/ja-jp/onedrive/developer/rest-api/getting-started/graph-oauth?view=odsp-graph-online
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': fileInput.type
            },
            body: fileInput
        });

        if (response.ok) {
            console.log('ファイルがアップロードされました。');
        } else {
            const errorData = await response.json();
            console.log(`アップロードに失敗しました: ${errorData.error.message}`);
        }
    } catch (error) {
        console.log(`エラーが発生しました: ${error.message}`);
    }
});