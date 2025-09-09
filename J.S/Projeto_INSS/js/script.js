function updateOutput() {
    const htmlCode = document.getElementById('html-input').value;
    const cssCode = document.getElementById('css-input').value;
    const jsCode = document.getElementById('js-input').value;

    const outputDiv = document.getElementById('code-output');

    outputDiv.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    outputDiv.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>${cssCode}</style>
        </head>
        <body>
            ${htmlCode}
            <script>${jsCode}</script>
        </body>
        </html>
    `);
    doc.close();
}

document.getElementById('html-input').addEventListener('input', updateOutput);
document.getElementById('css-input').addEventListener('input', updateOutput);
document.getElementById('js-input').addEventListener('input', updateOutput);