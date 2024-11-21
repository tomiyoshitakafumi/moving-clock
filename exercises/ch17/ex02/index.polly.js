import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';
import { createIssue, closeIssue, listOpenIssues } from './index.js';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe('GitHub API Tests with Polly.JS', () => {
    let polly;
    let options;

    beforeAll(() => {
        polly = new Polly('GitHub API', {
            adapters: ['node-http'],
            persister: 'fs',
            persisterOptions: {
                fs: {
                    recordingsDir: './recordings'
                }
            },
            //最初のリクエストが記録され、次回以降は記録されたレスポンスがリプレイさされる
            recordIfMissing: true
        });

        const { server } = polly;

        server.any().on('beforePersist', (req, recording) => {
            // トークンをマスク
            if (req.headers.authorization) {
                req.headers.authorization = 'token [REDACTED]';
            }
        });

        options = {
            token: '',
            repo: 'RICOH-JStraining',
            username: 'tomiyoshitakafumi',
            verbose: false,
            command: null,
            title: 'pollytitle',
            body: 'pollybody',
            issue_number: 1
        };
    });

    afterAll(async () => {
        await polly.stop();
    });

    test('Issue', async () => {
        options.command = 'create';
        const data = await createIssue(options);
        expect(data.title).toBe('pollytitle');
        expect(data.body).toBe('pollybody');

        options.command = 'list';
        const dataList = await listOpenIssues(options);
        expect(dataList[0].title).toBe('pollytitle');
        expect(data.body).toBe('pollybody');

        options.command = 'close';
        options.issue_number = dataList[0].number;
        const dataClosed = await closeIssue(options);
        expect(dataClosed.number).toBe(dataList[0].number);
        expect(dataClosed.state).toBe('closed');
    });
});