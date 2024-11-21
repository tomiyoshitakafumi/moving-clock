// 先頭の2つは node とファイル名なので削除
const args = process.argv.slice(2);
const options = {
    token: null,
    repo: null,
    username: null,
    verbose: false,
    command: null,
    title: null,
    body: null,
    issue_number: null
};

for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
        case '-t':
        case '--token':
            // トークンは次の引数にある
            options.token = args[++i];
            break;
        case '-r':
        case '--repo':
            options.repo = args[++i];
            break;
        case '-u':
        case '--username':
            options.username = args[++i];
            break;
        case '-v':
        case '--verbose':
            options.verbose = true;
            break;
        case 'create':
            options.command = 'create';
            options.title = args[++i];
            options.body = args[++i];
            break;
        case 'close':
            options.command = 'close';
            options.issue_number = args[++i];
            break;
        case 'list':
            options.command = 'list';
            break;
        case '-h':
        case '--help':
            console.log(`Usage:
  -t, --token <token>       GitHub Personal Access Token
  -r, --repo <repo>         GitHub Repository
  -u, --username <username> GitHub Username
  -v, --verbose             Enable verbose logging
  create <title> [body]     Create a new issue
  close <issue_number>      Close an issue
  list                      List open issues
  -h, --help                Show help`);
            process.exit(0);
        default:
            console.error(`Unknown argument: ${args[i]}`);
            process.exit(1);
    }
}
// 共通で使うリクエストのヘルパー関数
async function githubApi(endpoint, method, ops, data = null) {
    const url = `https://api.github.com${endpoint}`;
    const headers = {
        'Authorization': `token ${ops.token}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28'
    };

    const config = {
        method,
        headers,
        body: data ? JSON.stringify(data) : null
    };

    if (ops.verbose) {
        console.log('Request:', config);
    }

    const response = await fetch(url, config);
    const responseData = await response.json();
    if (ops.verbose) {
        console.log('Response:', responseData);
    }

    if (!response.ok) {
        throw new Error(responseData.message || 'Request failed');
    }

    return responseData;
}

export async function createIssue(ops) {
    const data = await githubApi(`/repos/${ops.username}/${ops.repo}/issues`, 'POST', ops, { title: ops.title, body: ops.body });
    return data;
}

export async function closeIssue(ops) {
    try {
        const data = await githubApi(`/repos/${ops.username}/${ops.repo}/issues/${ops.issue_number}`, 'PATCH', ops, { state: 'closed' });
        return data;
    } catch (error) {
        console.error('Error closing issue:', error.message);
    }
}

export async function listOpenIssues(ops) {
    try {
        //GitHub API  https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28
        const data = await githubApi(`/repos/${ops.username}/${ops.repo}/issues`, 'GET', ops);

        return data;
    } catch (error) {
        console.error('Error listing issues:', error.message);
    }
}

// コマンドの実行
if (options.command === 'create') {
    console.log('Issue created:', createIssue(options));
} else if (options.command === 'close') {
    console.log('Issue closed:', closeIssue(options));
} else if (options.command === 'list') {
    listOpenIssues(options).then(data => {
        data.forEach(issue => {
            console.log(`ID: ${issue.number}, Title: ${issue.title}`);
        });
    });
} 
