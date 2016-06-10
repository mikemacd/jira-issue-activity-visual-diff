// Saves options to chrome.storage
function save_options() {
    var jira_urls = document.getElementById('jira_urls').value;

    chrome.storage.sync.set({"jiraUrls": jira_urls});

    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
        status.textContent = '';
    }, 500);

}

// Restores state using the preferences stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get("jiraUrls", function (result) {
        document.getElementById('jira_urls').value = result.jiraUrls;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);