import { createIssue, closeIssue, listOpenIssues } from './index.js';
import { jest } from '@jest/globals';

//jest.mock('node-fetch')はESMだとうまく動かない?
global.fetch = jest.fn();

describe('GitHubAPIをモックする', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('createIssue', async () => {
        const mockResponse = { id: 1, title: 'Test Issue' };
        //jest.fn().mockImplementation(() => Promise.resolve(value));の糖衣構文
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse,
        });

        const options = {
            token: 'test-token',
            repo: 'test-repo',
            username: 'test-user',
            title: 'Test Issue',
            body: 'Test body',
            verbose: true,
        };

        const result = await createIssue(options);
        expect(result).toEqual(mockResponse);
        expect(fetch).toHaveBeenCalledWith(
            'https://api.github.com/repos/test-user/test-repo/issues',
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'Authorization': 'token test-token',
                }),
                body: JSON.stringify({ title: 'Test Issue', body: 'Test body' }),
            })
        );
    });

    test('closeIssue', async () => {
        const mockResponse = { id: 1, state: 'closed' };
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse,
        });

        const options = {
            token: 'test-token',
            repo: 'test-repo',
            username: 'test-user',
            issue_number: 1,
            verbose: true,
        };

        const result = await closeIssue(options);
        expect(result).toEqual(mockResponse);
    });

    test('listOpenIssues', async () => {
        const mockResponse = [{ id: 1, title: 'Test Issue' }];
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResponse,
        });

        const options = {
            token: 'test-token',
            repo: 'test-repo',
            username: 'test-user',
            verbose: true,
        };

        const result = await listOpenIssues(options);
        expect(result).toEqual(mockResponse);
    });
});