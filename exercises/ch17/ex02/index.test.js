import { createIssue, closeIssue, listOpenIssues } from './index.js';
import { jest } from '@jest/globals';

//jest.mock('node-fetch')はESMだとうまく動かない?
global.fetch = jest.fn();

describe('GitHubAPIをモックする', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    test('createIssue', async () => {
        const mockResponse = { state: 'create' };
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
        //モック関数の引数がGitHubAPIの指定された引数と一致するかどうか
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
        const mockResponse = { state: 'closed' };
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
        expect(fetch).toHaveBeenCalledWith(
            'https://api.github.com/repos/test-user/test-repo/issues/1',
            expect.objectContaining({
                method: 'PATCH',
                headers: expect.objectContaining({
                    'Authorization': 'token test-token',
                }),
                body: JSON.stringify({ state: 'closed' }),
            })
        );
    });

    test('listOpenIssues', async () => {
        const mockResponse = [{ state: 'list' }];
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
        expect(fetch).toHaveBeenCalledWith(
            'https://api.github.com/repos/test-user/test-repo/issues',
            expect.objectContaining({
                method: 'GET',
                headers: expect.objectContaining({
                    'Authorization': 'token test-token',
                }),
            })
        );
    });
});