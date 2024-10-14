

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
            options.body = args[ ++i];
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
async function githubApi(endpoint, method, data = null) {
    const url = `https://api.github.com${endpoint}`;
    const headers = {
        'Authorization': `token ${options.token}`,
        'Accept': 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28'
    };

    const config = {
        method,
        headers,
        body: data ? JSON.stringify(data) : null
    };

    if (options.verbose) {
        console.log('Request:', config);
    }

    const response = await fetch(url, config);
    const responseData = await response.json();
    // console.log(responseData);
    if (options.verbose) {
        console.log('Response:', responseData);
    }

    if (!response.ok) {
        throw new Error(responseData.message || 'Request failed');
    }

    return responseData;
}

async function createIssue(title, body) {
    const data = await githubApi(`/repos/${options.username}/${options.repo}/issues`, 'POST', { title, body });
        console.log('Issue created:', data);
}

async function closeIssue(issueNumber) {
    try {
        const data = await githubApi(`/repos/${options.username}/${options.repo}/issues/${issueNumber}`, 'PATCH', { state: 'closed' });
        console.log('Issue closed:', data);
    } catch (error) {
        console.error('Error closing issue:', error.message);
    }
}

async function listOpenIssues() {
    try {
        //GitHub API  https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28
        const data = await githubApi(`/repos/${options.username}/${options.repo}/issues`, 'GET');
        data.forEach(issue => {
            console.log(`ID: ${issue.number}, Title: ${issue.title}`);
        });
    } catch (error) {
        console.error('Error listing issues:', error.message);
    }
}

// コマンドの実行
if (options.command === 'create') {
    createIssue(options.title, options.body);
} else if (options.command === 'close') {
    closeIssue(options.issue_number);
} else if (options.command === 'list') {
    listOpenIssues();
} 