import net from 'net';
let maxConnections = 50000; // 最大接続数の仮定
let connections = 0;

for (let i = 0; i < maxConnections; i++) {
    const client = new net.Socket();

    client.connect(8000, 'localhost', () => {
        connections++;
        console.log(`Connection ${connections} established`);
    });

    client.on('error', (err) => {
        console.error(`Connection ${connections + 1} failed: ${err.message}`);
        process.exit();
    });
}